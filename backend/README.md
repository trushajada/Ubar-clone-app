# User Registration Endpoint

## Endpoint: `/users/register`

### Description
This endpoint is used to register a new user. It validates the input data, checks if the user already exists, hashes the password, creates a new user, and returns a JWT token.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following properties:
- `fullname`: An object containing:
  - `firstname`: A string with a minimum length of 3 characters.
  - `lastname`: A string with a minimum length of 3 characters.
- `email`: A valid email address.
- `password`: A string with a minimum length of 6 characters.

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses

#### Success
- **Status Code**: `201 Created`
- **Response Body**: A JSON object containing the created user and a JWT token.

Example:
```json
{
  "user": {
    "_id": "60c72b2f9b1e8b001c8e4d3b",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Validation Error
- **Status Code**: `400 Bad Request`
- **Response Body**: A JSON object containing the validation errors.

Example:
```json
{
  "errors": [
    {
      "msg": "Please enter a valid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Last name must be at least 3 characters long",
      "param": "fullname.lastname",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

#### User Already Exists
- **Status Code**: `400 Bad Request`
- **Response Body**: A JSON object with an error message.

Example:
```json
{
  "message": "User already exist"
}
```
