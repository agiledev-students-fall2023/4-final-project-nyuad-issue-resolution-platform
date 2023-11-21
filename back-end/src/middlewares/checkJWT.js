import passport from "../../config/passportConfig.js";

export default function checkJWT(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      console.error("Error during authentication:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    
    if (!user) {
      if (req.path !== "/") {
        console.log("User not authenticated. Sending response.");
        // Send a 401 Unauthorized response with a message
        return res.status(401).json({ authenticated: false, message: "User not authenticated" });
      } else {
        return next();
      }
    } else {
      req.user = user;
      console.log("User authenticated.");
      next();
    }
  })(req, res, next);
}
