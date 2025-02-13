package products

import (
	"net/http"

	"local_eat/api/initializers"
	"local_eat/api/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Routes(route *gin.Engine) {
	products := route.Group("/api/products")
	{
		products.GET("", GetProducts)
	}
}

// @Summary Get products
// @Description Get products id, name, picture, category and description
// @Tags Products
// @Produce json
// @Success 200 {array} models.Product
// @Failure 404 "Not found"
// @Failure 500 "Internal server error"
// @Router /products [get]
func GetProducts(context *gin.Context) {
	var products []models.Product
	result := initializers.DB.Find(&products)
	if result.Error == gorm.ErrRecordNotFound {
		context.JSON(http.StatusNotFound, gin.H{})
		return

	}
	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{})
		return
	}
	context.JSON(http.StatusOK, products)
}
