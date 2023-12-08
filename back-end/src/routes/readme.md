Keep all the routes in this directory. Subroutes can be handled inside these files.
The logic of the routes should be handled by calling functions from the controllers directory.
This allows to separate the routes from the logic themselves.

For example:

src/routes/users.js file:

```javascript
import express from "express";
import { getAllUsers } from "../controllers/usersController.js";

const router = express.Router();

router.get("/", getAllUsers);

// ... Define other user routes
router.get("/:id", getUserById);

export default router;
```

app.js file:

```javascript
import express from "express";
const app = express();
import userRoutes from "./routes/users.js";

app.use("/api/users", userRoutes);
```
