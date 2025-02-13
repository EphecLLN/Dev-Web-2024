package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"
	"time"

	"local_eat/api/initializers"
	"local_eat/api/models"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/stretchr/testify/assert"
)

type basicAuth struct {
	Password string  `json:"password" example:"random_password123"`
	Username *string `json:"username,omitempty" example:"john_vleminckx"`
	Email    *string `json:"email,omitempty" example:"john_vleminckx@example.com"`
}

func TestPing(t *testing.T) {
	gin.SetMode(gin.TestMode)
	router := setupRouter()
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/ping", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
	assert.Equal(t, "pong", w.Body.String())
}

func TestSignup(t *testing.T) {
	gin.SetMode(gin.TestMode)
	router := setupRouter()

	password := "random_password123"
	username := "john_vleminckx"
	email := "john_vleminckx@example.com"

	answerGood := "{}"
	answerBad := "{\"error\":\"Invalid request\"}"
	answerInternal := "{\"error\":\"Internal server error\"}"

	w := httptest.NewRecorder()
	exampleUser := basicAuth{
		Password: password,
		Username: &username,
		Email:    &email,
	}
	userJson, _ := json.Marshal(exampleUser)

	// Test normal signup
	req, _ := http.NewRequest("POST", "/api/auth/signup", strings.NewReader(string(userJson)))
	router.ServeHTTP(w, req)
	assert.Equal(t, 200, w.Code)
	assert.Equal(t, answerGood, w.Body.String())
	initializers.DB.Where("username = ?", username).Delete(&models.Users{}) // Clean up

	// Test invalid request
	w = httptest.NewRecorder()
	wrongUserAll := basicAuth{
		Password: "",
		Username: nil,
		Email:    nil,
	}
	wrongUserAllJson, _ := json.Marshal(wrongUserAll)
	reqBadAll, _ := http.NewRequest("POST", "/api/auth/signup", strings.NewReader(string(wrongUserAllJson)))
	router.ServeHTTP(w, reqBadAll)
	assert.Equal(t, 400, w.Code)
	assert.Equal(t, answerBad, w.Body.String())

	w = httptest.NewRecorder()
	wrongUserPassword := basicAuth{
		Password: "",
		Username: &username,
		Email:    &email,
	}
	wrongUserPasswordJson, _ := json.Marshal(wrongUserPassword)
	reqBadPassword, _ := http.NewRequest("POST", "/api/auth/signup", strings.NewReader(string(wrongUserPasswordJson)))
	router.ServeHTTP(w, reqBadPassword)
	assert.Equal(t, 400, w.Code)
	assert.Equal(t, answerBad, w.Body.String())

	w = httptest.NewRecorder()
	wrongUserUsename := basicAuth{
		Password: password,
		Username: nil,
		Email:    &email,
	}
	wrongUserUsenameJson, _ := json.Marshal(wrongUserUsename)
	reqBadUsername, _ := http.NewRequest("POST", "/api/auth/signup", strings.NewReader(string(wrongUserUsenameJson)))
	router.ServeHTTP(w, reqBadUsername)
	assert.Equal(t, 400, w.Code)
	assert.Equal(t, answerBad, w.Body.String())

	w = httptest.NewRecorder()
	wrongUserEmail := basicAuth{
		Password: password,
		Username: &username,
		Email:    nil,
	}
	wrongUserEmailJson, _ := json.Marshal(wrongUserEmail)
	reqBadEmail, _ := http.NewRequest("POST", "/api/auth/signup", strings.NewReader(string(wrongUserEmailJson)))
	router.ServeHTTP(w, reqBadEmail)
	assert.Equal(t, 400, w.Code)
	assert.Equal(t, answerBad, w.Body.String())

	w = httptest.NewRecorder()
	reqDuplicate, _ := http.NewRequest("POST", "/api/auth/signup", strings.NewReader(string(userJson)))
	router.ServeHTTP(w, reqDuplicate)
	assert.Equal(t, 200, w.Code)
	assert.Equal(t, answerGood, w.Body.String())

	w = httptest.NewRecorder()
	router.ServeHTTP(w, reqDuplicate)
	assert.Equal(t, 400, w.Code)
	assert.Equal(t, answerBad, w.Body.String())

	// Test internal server error
	w = httptest.NewRecorder()
	sqlDB, _ := initializers.DB.DB()
	sqlDB.Close()
	reqNoDB, _ := http.NewRequest("POST", "/api/auth/signup", strings.NewReader(string(userJson)))
	router.ServeHTTP(w, reqNoDB)
	assert.Equal(t, 500, w.Code)
	assert.Equal(t, answerInternal, w.Body.String())
	initializers.ConnectBD() // Clean up
	initializers.DB.Where("username = ?", username).Delete(&models.Users{}) // Clean up
}

func TestLogin(t *testing.T) {
	gin.SetMode(gin.TestMode)
	router := setupRouter()

	password := "random_password123"
	username := "john_vleminckx"
	email := "john_vleminckx@example.com"

	answerGood := "{}"
	answerBadPassword := "{\"error\":\"Invalid password\"}"
	answerBadUser := "{\"error\":\"Invalid username or email\"}"
	answerInvalid := "{\"error\":\"Invalid request\"}"
	answerInternal := "{\"error\":\"Internal server error\"}"

	w := httptest.NewRecorder()
	exampleUser := basicAuth{
		Password: password,
		Username: &username,
		Email:    &email,
	}
	userJson, _ := json.Marshal(exampleUser)

	// Create user
	reqCreation, _ := http.NewRequest("POST", "/api/auth/signup", strings.NewReader(string(userJson)))
	router.ServeHTTP(w, reqCreation)
	assert.Equal(t, 200, w.Code)

	// Test normal login
	w = httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/api/auth/login", strings.NewReader(string(userJson)))
	router.ServeHTTP(w, req)
	assert.Equal(t, 200, w.Code)

	cookie := w.Result().Cookies()
	token := decodeToken(cookie[0].Value)
	assert.Equal(t, username, token)
	assert.Equal(t, answerGood, w.Body.String())

	w = httptest.NewRecorder()
	noUsername := basicAuth{
		Password: password,
		Username: nil,
		Email:    &email,
	}
	noUsernameJson, _ := json.Marshal(noUsername)
	reqNoUsername, _ := http.NewRequest("POST", "/api/auth/login", strings.NewReader(string(noUsernameJson)))
	router.ServeHTTP(w, reqNoUsername)
	assert.Equal(t, 200, w.Code)
	cookieNoUsename := w.Result().Cookies()
	tokenNoUsername := decodeToken(cookieNoUsename[0].Value)
	assert.Equal(t, username, tokenNoUsername)
	assert.Equal(t, answerGood, w.Body.String())

	w = httptest.NewRecorder()
	noEmail := basicAuth{
		Password: password,
		Username: &username,
		Email:    nil,
	}
	noEmailJson, _ := json.Marshal(noEmail)
	reqNoEmail, _ := http.NewRequest("POST", "/api/auth/login", strings.NewReader(string(noEmailJson)))
	router.ServeHTTP(w, reqNoEmail)
	assert.Equal(t, 200, w.Code)
	cookieNoEmail := w.Result().Cookies()
	tokenNoEmail := decodeToken(cookieNoEmail[0].Value)
	assert.Equal(t, username, tokenNoEmail)
	assert.Equal(t, answerGood, w.Body.String())

	// Test invalid request
	w = httptest.NewRecorder()
	wrongUser := basicAuth{
		Password: password,
		Username: nil,
		Email:    nil,
	}
	wrongUserJson, _ := json.Marshal(wrongUser)
	reqBadUser, _ := http.NewRequest("POST", "/api/auth/login", strings.NewReader(string(wrongUserJson)))
	router.ServeHTTP(w, reqBadUser)
	assert.Equal(t, 400, w.Code)
	assert.Equal(t, answerInvalid, w.Body.String())

	w = httptest.NewRecorder()
	wrongPassword := basicAuth{
		Password: "",
		Username: &username,
		Email:    &email,
	}
	wrongPasswordJson, _ := json.Marshal(wrongPassword)
	reqBadPassword, _ := http.NewRequest("POST", "/api/auth/login", strings.NewReader(string(wrongPasswordJson)))
	router.ServeHTTP(w, reqBadPassword)
	assert.Equal(t, 400, w.Code)
	assert.Equal(t, answerBadPassword, w.Body.String())

	w = httptest.NewRecorder()
	badUsername := "toto"
	wrongUsername := basicAuth{
		Password: password,
		Username: &badUsername,
		Email:    nil,
	}
	wrongUsernameJson, _ := json.Marshal(wrongUsername)
	reqBadUsername, _ := http.NewRequest("POST", "/api/auth/login", strings.NewReader(string(wrongUsernameJson)))
	router.ServeHTTP(w, reqBadUsername)
	assert.Equal(t, 400, w.Code)
	assert.Equal(t, answerBadUser, w.Body.String())

	w = httptest.NewRecorder()
	badEmail := "toto@example.com"
	wrongEmail := basicAuth{
		Password: password,
		Username: nil,
		Email:    &badEmail,
	}
	wrongEmailJson, _ := json.Marshal(wrongEmail)
	reqBadEmail, _ := http.NewRequest("POST", "/api/auth/login", strings.NewReader(string(wrongEmailJson)))
	router.ServeHTTP(w, reqBadEmail)
	assert.Equal(t, 400, w.Code)
	assert.Equal(t, answerBadUser, w.Body.String())

	// Internal server error
	w = httptest.NewRecorder()
	sqlDB, _ := initializers.DB.DB()
	sqlDB.Close()
	reqNoDB, _ := http.NewRequest("POST", "/api/auth/login", strings.NewReader(string(userJson)))
	router.ServeHTTP(w, reqNoDB)
	assert.Equal(t, 500, w.Code)
	assert.Equal(t, answerInternal, w.Body.String())
	initializers.ConnectBD() // Clean up
	initializers.DB.Where("username = ?", username).Delete(&models.Users{}) // Clean up
}

func TestAuthenticate(t *testing.T) {
	gin.SetMode(gin.TestMode)
	router := setupRouter()

	password := "random_password123"
	username := "john_vleminckx"
	email := "john_vleminckx@example.com"

	badUsername := "toto"
	badJWT := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvdG8iLCJleHAiOjE2MjQwNzQwMzB9.7"

	answerGood := "{\"user\":\"" + username + "\"}"

	// Create user
	w := httptest.NewRecorder()
	exampleUser := basicAuth{
		Password: password,
		Username: &username,
		Email:    &email,
	}
	userJson, _ := json.Marshal(exampleUser)
	reqCreation, _ := http.NewRequest("POST", "/api/auth/signup", strings.NewReader(string(userJson)))
	router.ServeHTTP(w, reqCreation)
	assert.Equal(t, 200, w.Code)

	// Get token
	w = httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/api/auth/login", strings.NewReader(string(userJson)))
	router.ServeHTTP(w, req)
	assert.Equal(t, 200, w.Code)
	cookie := w.Result().Cookies()

	// Test normal authenticate
	w = httptest.NewRecorder()
	reqAuth, _ := http.NewRequest("GET", "/api/auth/authenticate", nil)
	reqAuth.AddCookie(cookie[0])
	router.ServeHTTP(w, reqAuth)
	assert.Equal(t, 200, w.Code)
	assert.Equal(t, answerGood, w.Body.String())

	// Test unauthorized
	w = httptest.NewRecorder()
	reqNoAuth, _ := http.NewRequest("GET", "/api/auth/authenticate", nil)
	router.ServeHTTP(w, reqNoAuth)
	assert.Equal(t, 401, w.Code)
	assert.Equal(t, "", w.Body.String())

	w = httptest.NewRecorder()
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": badUsername,
		"exp":      time.Now().Add(time.Hour * 24).Unix(),
	})
	tokenString, _ := token.SignedString([]byte(os.Getenv("JWT_KEY")))
	reqBadToken, _ := http.NewRequest("GET", "/api/auth/authenticate", nil)
	reqBadToken.AddCookie(&http.Cookie{Name: "token", Value: tokenString})
	router.ServeHTTP(w, reqBadToken)
	assert.Equal(t, 401, w.Code)
	assert.Equal(t, "", w.Body.String())

	w = httptest.NewRecorder()
	token = jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": username,
		"exp":      time.Now().Unix(),
	})
	tokenString, _ = token.SignedString([]byte(os.Getenv("JWT_KEY")))
	reqExpiredToken, _ := http.NewRequest("GET", "/api/auth/authenticate", nil)
	reqExpiredToken.AddCookie(&http.Cookie{Name: "token", Value: tokenString})
	router.ServeHTTP(w, reqExpiredToken)
	assert.Equal(t, 401, w.Code)
	assert.Equal(t, "", w.Body.String())

	w = httptest.NewRecorder()
	token = jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": username,
		"exp":      time.Now().Add(time.Hour * 24).Unix(),
	})
	tokenString, _ = token.SignedString([]byte(badJWT))
	reqBadJWT, _ := http.NewRequest("GET", "/api/auth/authenticate", nil)
	reqBadJWT.AddCookie(&http.Cookie{Name: "token", Value: tokenString})
	router.ServeHTTP(w, reqBadJWT)
	assert.Equal(t, 401, w.Code)
	assert.Equal(t, "", w.Body.String())

	initializers.DB.Where("username = ?", username).Delete(&models.Users{}) // Clean up
}

func TestLogout(t *testing.T) {
	gin.SetMode(gin.TestMode)
	router := setupRouter()

	password := "random_password123"
	username :=	"john_vleminckx"
	email := "john_vleminckx@example.com"

	answerGood := "{}"
	answerBad := "{\"error\":\"Not logged in\"}"

	// Create user
	w := httptest.NewRecorder()
	exampleUser := basicAuth{
		Password: password,
		Username: &username,
		Email:    &email,
	}
	userJson, _ := json.Marshal(exampleUser)
	reqCreation, _ := http.NewRequest("POST", "/api/auth/signup", strings.NewReader(string(userJson)))
	router.ServeHTTP(w, reqCreation)
	assert.Equal(t, 200, w.Code)

	// Get token
	w = httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/api/auth/login", strings.NewReader(string(userJson)))
	router.ServeHTTP(w, req)
	assert.Equal(t, 200, w.Code)
	cookie := w.Result().Cookies()

	// Test normal logout
	w = httptest.NewRecorder()
	reqLogout, _ := http.NewRequest("DELETE", "/api/auth/logout", nil)
	reqLogout.AddCookie(cookie[0])
	router.ServeHTTP(w, reqLogout)
	assert.Equal(t, 200, w.Code)
	assert.Equal(t, answerGood, w.Body.String())
	cookieDelete := w.Result().Cookies()
	assert.Equal(t, "token", cookieDelete[0].Name)
	assert.Equal(t, "deleted", cookieDelete[0].Value)
	assert.Equal(t, 0, cookieDelete[0].MaxAge, 0)

	// Test not logged in
	w = httptest.NewRecorder()
	reqNoLogout, _ := http.NewRequest("DELETE", "/api/auth/logout", nil)
	router.ServeHTTP(w, reqNoLogout)
	assert.Equal(t, 400, w.Code)
	assert.Equal(t, answerBad, w.Body.String())

	initializers.DB.Where("username = ?", username).Delete(&models.Users{}) // Clean up
}

func decodeToken(tokenString string) string {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("JWT_KEY")), nil
	})
	if err != nil {
		panic(err)
	}
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims["username"].(string)
	} else {
		panic("Invalid token")
	}
}