package auth

import (
	"net/http"
	"os"
	"time"

	"local_eat/api/initializers"
	"local_eat/api/middleware"
	"local_eat/api/models"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type basicAuth struct {
	Password string  `json:"password" example:"random_password123"`
	Username *string `json:"username,omitempty" example:"john_vleminckx"`
	Email    *string `json:"email,omitempty" example:"john_vleminckx@example.com"`
}

func Routes(route *gin.Engine) {
	users := route.Group("/api/auth")
	{
		users.POST("/signup", signup)
		users.POST("/login", login)
		users.GET("/authenticate", middleware.AuthMiddleware, authenticate)
		users.DELETE("/logout", logout)
	}
}

// @Summary Send user data to create a new user
// @Description Send user data to create a new user
// @Tags Auth
// @Accept json
// @Param user body basicAuth true "User data"
// @Success 200 "User created"
// @Failure 400 "Invalid request"
// @Failure 500 "Internal server error"
// @Router /auth/signup [post]
func signup(context *gin.Context) {
	var body basicAuth

	if context.BindJSON(&body) != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request"})
		return
	}
	if (body.Password == "") || (body.Username == nil) || (body.Email == nil) {
		context.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request"})
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"error": "Internal server error"})
		return
	}

	user := models.Users{
		Username: body.Username,
		Password: string(hash),
		Email:    body.Email,
	}
	result := initializers.DB.Create(&user)
	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"error": "Internal server error",
		})
		return
	}
	context.JSON(http.StatusOK, gin.H{})
}

// @Summary Send username and password to login
// @Description Send username and password to login to receive a token in a cookie
// @Tags Auth
// @Accept json
// @Param user body basicAuth true "User data"
// @Success 200 "User authenticated"
// @Failure 400 "User not found"
// @Failure 400 "Invalid password"
// @Failure 500 "Internal server error"
// @Router /auth/login [post]
func login(context *gin.Context) {
	var body basicAuth
	if context.BindJSON(&body) != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request"})
		return
	}

	var user models.Users
	var result *gorm.DB
	if (body.Username == nil) && (body.Email == nil) {
		context.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request",
		})
		return
	}

	if body.Username == nil {
		result = initializers.DB.First(&user, "email = ?", body.Email)
	} else {
		result = initializers.DB.First(&user, "username = ?", body.Username)
	}

	if result.Error != nil {
		switch result.Error {
		case gorm.ErrRecordNotFound:
			context.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid username or email",
			})
			return
		default:
			context.JSON(http.StatusInternalServerError, gin.H{
				"error": "Internal server error",
			})
			return
		}
	}

	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password)) != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid password"})
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": user.Username,
		"exp":      time.Now().Add(time.Hour * 24).Unix(),
	})
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_KEY")))
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"error": "Internal server error"})
		return
	}
	context.SetSameSite(http.SameSiteLaxMode)
	context.SetCookie("token", tokenString, 3600*24, "", "", false, true)
	context.JSON(http.StatusOK, gin.H{})
}

// @Summary Validate user token
// @Description Validate user token
// @Tags Auth
// @Produce json
// @Success 200 "User authenticated"
// @Failure 401 "Unauthorized"
// @Router /auth/authenticate [get]
// @Security JWT
func authenticate(context *gin.Context) {
	user, _ := context.Get("user")
	context.JSON(http.StatusOK, gin.H{
		"user": user.(models.Users).Username,
	})
}

// @Summary Delete JWT token
// @Description Modifies token value and sets expiry date to be immediate
// @Tags Auth
// @Success 200 "Token deleted successfully"
// @Failure 400 "No token present in request"
// @Router /auth/logout [delete]
func logout(context *gin.Context) {
	_, err := context.Cookie("token")
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"error": "Not logged in",
		})
		return
	}
	context.SetCookie("token", "deleted", 0, "", "", false, true)
	context.JSON(http.StatusOK, gin.H{})
}
