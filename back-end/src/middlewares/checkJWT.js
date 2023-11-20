import passport from "../../config/passportConfig.js";

export default function checkJWT(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err || !user) {
      if (req.path !== "/") {
        console.log("User not authenticated. Redirecting to login page.");
        next();
        // return res.redirect("/");
        // redirecting won't work as the routing is managed by react in the frontend, not express
        // we would need to send some json data here rather that indicates a redirect in the frontend
      } else {
        return next();
      }
    } else {
      req.user = user; // Forward user information to the next middleware
      console.log("User authenticated.");
      next();
    }
  })(req, res, next);
}
