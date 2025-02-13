package middleware

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"local_eat/api/initializers"
	model "local_eat/api/models"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleware(context *gin.Context) {
	tokenString, err := context.Cookie("token")
	if err != nil {
		context.AbortWithStatus(http.StatusUnauthorized)
		return
	}
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("JWT_KEY")), nil
	})

	if err != nil {
		context.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			context.AbortWithStatus(http.StatusUnauthorized)
			return
		}
		var user model.Users
		result := initializers.DB.First(&user, "username = ?", claims["username"])
		if result.Error != nil || user.Username == nil {
			context.AbortWithStatus(http.StatusUnauthorized)
			return
		}
		context.Set("user", user)
		context.Next()
	} else {
		context.AbortWithStatus(http.StatusUnauthorized)
		return
	}
}
