package models

import (
	"time"
)

type Users struct {
	Username         *string    `json:"username,omitempty" example:"john_vleminckx" gorm:"primaryKey; type:varchar(20); unique"`
	Producer         Producers `gorm:"foreignKey:Username; references:Username; constraint:OnDelete:CASCADE;"`
	Password         string     `json:"password" example:"ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"`
	Email            *string    `json:"email,omitempty" example:"mateo@example.com" gorm:"type:varchar(50)"`
	CreatedAt        time.Time  `json:"createdAt" example:"Mon Jan 2 15:04:05 MST 2006"`
	ProfilePictureId *string    `json:"profilePictureId,omitempty" example:"1524689" gorm:"type:char(7); constraint:OnUpdate:CASCADE;"`
}
type Producers struct {
	ID          string       `json:"id" example:"1" gorm:"primaryKey; type:char(7); not null"`
	Username    string       `json:"username" example:"john_vleminckx" gorm:"not null; index"`
	Firstname   string       `json:"firstname" example:"John" gorm:"type:char(20); not null"`
	Lastname    string       `json:"lastname" example:"Vleminckx" gorm:"type:char(20); not null"`
	PhoneNum    string       `json:"phoneNum" example:"0483598799" gorm:"type:char(10); not null"`
	EmailPro    string       `json:"emailPro" example:"postmaster@example.com" gorm:"type:varchar(50); not null"`
	RelCompProd *RelCompProd `gorm:"foreignKey:ProducerID; references:ID; constraint:OnDelete:CASCADE;"`
}

type Category struct {
	ID          string  `json:"id" example:"CAT1" gorm:"primaryKey;type:char(4);not null"`
	Name        string  `json:"name" example:"Legume" gorm:"type:varchar(30);not null;unique"`
	MotherCatID *string `json:"mother_cat,omitempty" example:"CAT2" gorm:"type:char(4);null"`
	MotherCat   *Category
	Description *string `json:"description,omitempty" example:"Ceci est une carrotte" gorm:"type:longtext"`
}

type Product struct {
	ID             string          `json:"id" example:"PROD1" gorm:"primaryKey;type:char(5);not null"`
	Name           string          `json:"name" example:"Laptop" gorm:"type:varchar(30);not null;unique"`
	CategoryID     string          `json:"cat" example:"CAT1" gorm:"type:char(4);not null"`
	Category       *Category       `gorm:"foreignKey:CategoryID; references:ID"`
	Description    *string         `json:"description,omitempty" example:"A powerful laptop with high-resolution display." gorm:"type:longtext;null"`
	Picture        string          `json:"picture" example:"image.jpg" gorm:"type:varchar(30); not null"`
	CatalogDetails *CatalogDetails `gorm:"foreignKey:ID; references:ProductId"`
}
type CatalogDetails struct {
	ID           string    `json:"id" example:"1" gorm:"primaryKey"`
	CompanyName  string    `json:"CompanyName" example:"CompanyTest" gorm:"unique"`
	ProductId    string    `json:"ProductId" example:"1" gorm:"unique"`
	CreatedAt    time.Time `json:"createdAt" example:"Mon Jan 2 15:04:05 MST 2006"`
	Quantity     int       `json:"Quantity" example:"10" gorm:"default:0"`
	Availability bool      `json:"Availability" example:"true" gorm:"default:true"`
	Price        float64   `gorm:"type:decimal(10,2); default:0.00"`
}

type Company struct {
	CompanyName    string          `json:"CompanyName" gorm:"primaryKey"`
	Password       string          `gorm:"not null"`
	Alias          string          `gorm:"not null;unique"`
	Address        string          `gorm:"not null"`
	Mail           string          `gorm:"not null"`
	PhoneNum       string          `gorm:"not null"`
	VATNum         string          `gorm:"not null"`
	Description    string          `gorm:"type:longtext"`
	CatalogDetails *CatalogDetails `gorm:"foreignKey:CompanyName; references:CompanyName"`
	RelCompProd    *RelCompProd    `gorm:"foreignKey:CompanyName; references:CompanyName; constraint:OnDelete:CASCADE;"`
}

type RelCompProd struct {
	ProducerID  string `json:"id" example:"1" gorm:"primaryKey; type:char(7); not null; index"`
	CompanyName string `json:"CompanyName" gorm:"primaryKey; index"`
}

type Images struct {
	ID string `gorm:"primaryKey; type:char(7);"`
	Path string `gorm:"unique; not null"`
	Description *string
	Users *Users `gorm:"foreignKey: ProfilePictureId; references: ID;"`
}
