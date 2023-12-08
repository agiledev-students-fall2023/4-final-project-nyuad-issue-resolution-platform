The controller functions basically go as callbacks to the route handler functions (not middlewares).
They receive (req, res) and in some cases (where required) the "next" function as parameters.
The controller functions are responsible for handling the logic of the routes.

For example:

// src/controllers/usersController.js

```JS
export const getAllUsers = (req, res) => {
    // Logic to handle the GET request
    res.json([{ name: 'John Doe' }]);
};
```

// src/routes/users.js

```JS
import express from 'express';
import { getAllUsers } from '../controllers/usersController.js';
const router = express.Router();

router.get("/", getAllUsers);
```
