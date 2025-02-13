package initializers

import (
	"log"
	"os"

	"local_eat/api/models"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectBD() {
	user := os.Getenv("DB_USER")
	pass := os.Getenv("DB_PASS")
	addr := os.Getenv("DB_HOST") + ":" + os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")
	param := "?parseTime=True"
	dsn := user + ":" + pass + "@tcp(" + addr + ")/" + dbName + param

	var err error
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(DB)
	}
}

func LoadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found")
	}
}

func SyncDB() {
	err := DB.AutoMigrate(&models.Images{}, &models.Users{}, &models.Producers{}, &models.Category{}, &models.Product{},
		&models.Company{}, &models.CatalogDetails{}, &models.RelCompProd{})
	if err != nil {
		log.Fatal(err)
	}
}
