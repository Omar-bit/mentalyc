const jwt = require('jsonwebtoken');
function auth(req, res, next) {
  const token = req.headers.token;

  try {
    var decoded = jwt.verify(token, 'secret');
    if (!decoded) {
      return res.status(401).json({ error: true, data: 'token invalide' });
    }

    req.idPsy = decoded.idPsy;
    req.name = decoded.name;
    next();
  } catch (err) {
    return res.status(401).json({ error: true, data: 'token invalide' });
  }
}
module.exports = auth;
