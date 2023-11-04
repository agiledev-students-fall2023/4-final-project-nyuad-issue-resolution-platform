# API Documentation

The backend URL is set in the .env file. You can access it in your application using:

```
const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_URL;
```

All API requests are made to:

```
{backend-host-url}/api
```

## Endpoints

**_Special Note for Request Body:_**

Whenever multiple actions or data are being sent to the same API endpoint, ensure to include an ID in the request body. This ID will make it easier to filter and distinguish the intended action or data on the backend.

### Login and Authentication

Allows users (students or admins) to log in.

URL:

- Endpoint

```
/login/{userType}
```

- userType: "admin" or "student"
- Method: POST

Request Body:

```
{
    "email": "string",
    "password": "string"
}
```

### Issues Retrieval

Allows retrieval of issues specific to a student or a department.

URL:

- Endpoint:

```
/issues/{userType}/:paramName
```

- userType: "admin" or "student"
- paramName: Either studentNetID or deptName, depending on userType
- Method: GET

Request Body:

```
// Not Implemented Yet
// ID and issue number are a must
```

### Actions

Allows students or admins to perform actions like button presses, department changes, etc.

**_Important Note:_**

Whenever an update is anticipated in the frontend due to an action, it should first be communicated and updated on the backend by sending a POST request to the actions endpoint. The frontend update should only occur as a consequence of the new data being fetched from the backend. This ensures that the frontend remains in sync with the backend's state, preserving data integrity and consistency across the application.

URL:

- Endpoint:

```
/actions/{userType}/:paramName
```

- userType: "admin" or "student"
- paramName: Either studentNetID or deptName, depending on userType
- Method: POST

Request Body:

```
// Not Implemented Yet
// ID (and action type) must be present
```
