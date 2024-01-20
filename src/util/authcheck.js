export function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  // If not authenticated, redirect to the login page.
  res.redirect("/login");
}

export function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // If already authenticated, redirect to the dashboard.
    return res.redirect("/dashboard");
  }
  // If not authenticated, continue to the next middleware.
  next();
}