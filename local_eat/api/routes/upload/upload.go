package upload

import (
	"fmt"
	"io"
	"local_eat/api/initializers"
	"local_eat/api/middleware"
	"local_eat/api/models"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

func Routes(route *gin.Engine) {
	upload := route.Group("/api/upload")
	{
		upload.POST("", middleware.AuthMiddleware, uploadFile)
	}
}

func uploadFile(context *gin.Context) {
	user, _ := context.Get("user")
	foundUser := user.(models.Users).Username
	var producer models.Producers

	result := initializers.DB.Where("username = ?", *foundUser).First(&producer)
	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving producer from database"})
		return
	}
	if result.RowsAffected == 0 {
		context.JSON(http.StatusNotFound, gin.H{"error": "Producer not found"})
		return
	}
	var relCompProd models.RelCompProd
	result2 := initializers.DB.Where("producer_id = ?", producer.ID).First(&relCompProd)
	if result2.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving CompanyName from database"})
		return
	}
	var company models.Company
	result3 := initializers.DB.Where("company_name = ?", relCompProd.CompanyName).First(&company)
	if result3.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving company from database"})
		return
	}
	var catalogDetails models.CatalogDetails
	var currentProductCount int
	if err := initializers.DB.First(&catalogDetails, "company_name = ?", company.CompanyName).Error; err != nil {
		currentProductCount = 0
	} else {
		var maxID int
		if err := initializers.DB.Model(&models.CatalogDetails{}).Where("company_name = ?", company.CompanyName).Select("MAX(id)").Row().Scan(&maxID); err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to get max ID"})
			return
		}
		currentProductCount = maxID + 1
	}

	file, _, err := context.Request.FormFile("myFile")
	if err != nil {
		context.String(http.StatusBadRequest, "Error retrieving the file: %v", err)
		return
	}
	defer file.Close()

	filename := fmt.Sprintf("produit_%d.png", currentProductCount)

	uploadDir := "images/" + company.CompanyName + "/"
	err = os.MkdirAll(uploadDir, 0755)
	if err != nil {
		context.String(http.StatusInternalServerError, "Error creating upload directory: %v", err)
		return
	}
	filePath := filepath.Join(uploadDir, filename)

	newFile, err := os.Create(filePath)
	if err != nil {
		context.String(http.StatusInternalServerError, "Error creating file: %v", err)
		return
	}
	defer newFile.Close()

	_, err = io.Copy(newFile, file)
	if err != nil {
		context.String(http.StatusInternalServerError, "Error copying file contents: %v", err)
		return
	}

	context.String(http.StatusOK, "Successfully uploaded file: %s", filePath)
}
