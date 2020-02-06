exports.cookieExtractor = function(req) {
  if (req.cookies) {
    req.userCookies = req.cookies.jwt;
    return req.userCookies;
  }
  return "";
};
