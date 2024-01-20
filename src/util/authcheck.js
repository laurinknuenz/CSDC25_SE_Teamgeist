export function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("AuthCheck: CheckAuthenticated - Positive");
    return next();
  }
  // If not authenticated, redirect to the login page.
  console.log("AuthCheck: CheckAuthenticated - Negative");
  res.redirect("/login");
}

export function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("AuthCheck: CheckNotAuthenticated - Negative");
    // If already authenticated, redirect to the dashboard.
    return res.redirect("/dashboard");
  }
  // If not authenticated, continue to the next middleware.
  console.log("AuthCheck: CheckNotAuthenticated - Positive");
  next();
}