// Hardcoded values
const student = { username: "s", password: "1" };
const admin = { username: "a", password: "1" };

export function loginStudentHandler(req, res) {
  if (
    req.body.username === student.username &&
    req.body.password === student.password
  ) {
    res.status(200).json({ authenticated: true });
  } else {
    res.status(200).json({ authenticated: false });
  }
}

export function loginAdminHandler(req, res) {
  if (
    req.body.username === admin.username &&
    req.body.password === admin.password
  ) {
    res.json({ authenticated: true });
  } else {
    res.json({ authenticated: false });
  }
}
