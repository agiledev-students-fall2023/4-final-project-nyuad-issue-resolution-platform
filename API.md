# API Documentation

#### Login API:
- Endpoint /api/{userType}/login
- userType: "admin" or "student"
- Method: POST
- Request Body:
```
{
    "email": "string",
    "password": "string"
}
```