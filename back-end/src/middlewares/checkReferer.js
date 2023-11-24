export default function checkReferer(req, res, next) {
    const referer = req.headers.referer;
    if (!referer || !referer.startsWith(process.env.FRONTEND_URL)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  }
