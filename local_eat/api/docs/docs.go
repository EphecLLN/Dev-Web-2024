// Package docs Code generated by swaggo/swag. DO NOT EDIT
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "produces": [
        "application/json"
    ],
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "contact": {},
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/api/auth/authenticate": {
            "get": {
                "description": "Validate user token",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Auth"
                ],
                "summary": "Validate user token",
                "responses": {
                    "200": {
                        "description": "User authenticated",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/api/auth/login": {
            "post": {
                "description": "Send username and password to login to receive a token in a cookie",
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "Auth"
                ],
                "summary": "Send username and password to login",
                "parameters": [
                    {
                        "description": "User data",
                        "name": "user",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/model.UsersLogin"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "400": {
                        "description": "Invalid password",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "500": {
                        "description": "Internal server error",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/api/auth/signup": {
            "post": {
                "description": "Send user data to create a new user",
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "Auth"
                ],
                "summary": "Send user data to create a new user",
                "parameters": [
                    {
                        "description": "User data",
                        "name": "user",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/model.UsersSignup"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "400": {
                        "description": "Failed to create user",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "500": {
                        "description": "Internal server error",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/api/producers": {
            "get": {
                "description": "Get producers id, name, picture and created values",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Producers"
                ],
                "summary": "Get producers",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/model.Producers"
                            }
                        }
                    },
                    "500": {
                        "description": "Internal server error",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "model.Producers": {
            "type": "object",
            "properties": {
                "created": {
                    "type": "string",
                    "example": "2020-01-01"
                },
                "id": {
                    "type": "integer",
                    "example": 1
                },
                "name": {
                    "type": "string",
                    "example": "John"
                },
                "picture": {
                    "type": "string",
                    "example": "John.jpg"
                }
            }
        },
        "model.UsersLogin": {
            "type": "object",
            "properties": {
                "email": {
                    "type": "string",
                    "example": "john@example.com"
                },
                "password": {
                    "type": "string",
                    "example": "1234"
                },
                "username": {
                    "type": "string",
                    "example": "John"
                }
            }
        },
        "model.UsersSignup": {
            "type": "object",
            "properties": {
                "address": {
                    "type": "string",
                    "example": "1234 Main St"
                },
                "age": {
                    "type": "integer",
                    "example": 20
                },
                "cellphone": {
                    "type": "string",
                    "example": "1234567890"
                },
                "email": {
                    "type": "string",
                    "example": "john@example.com"
                },
                "gender": {
                    "type": "string",
                    "example": "M"
                },
                "locality": {
                    "type": "integer",
                    "example": 1650
                },
                "password": {
                    "type": "string",
                    "example": "1234"
                },
                "username": {
                    "type": "string",
                    "example": "John"
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "1.0",
	Host:             "localhost:8080",
	BasePath:         "/",
	Schemes:          []string{"http"},
	Title:            "local eat API",
	Description:      "This is a sample server local eat API server.",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
