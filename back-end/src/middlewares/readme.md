Keep all the middlewares in this directory.

For example:

// src/middlewares/authMiddleware.js

```JS
const authMiddleware = (req, res, next) => {
  // Here you'd have your authentication logic
  const userIsAuthenticated = true; // This should be replaced with actual auth logic

  if (userIsAuthenticated) {
    console.log('User is authenticated');
    next(); // Pass control to the next middleware/route handler
  } else {
    res.status(401).send('Not authorized'); // End the request-response cycle
  }
};

export default authMiddleware;

```

// app.js

```JS
import express from 'express';
import authMiddleware from './middlewares/authMiddleware.js';
import userRouter from './routes/userRoutes.js';

const app = express();

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
```
