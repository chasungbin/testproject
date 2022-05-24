//접속로그 남기기
const requestMiddleware = (req, res, next) => {
    console.log(
      "ip:",
      req.ip,
      "domain:",
      req.rawHeaders[1],
      "method:",
      req.method,
      "Request URL:",
      req.originalUrl,
      "-",
      new Date()
    );
    next();
  };

module.exports = { requestMiddleware };