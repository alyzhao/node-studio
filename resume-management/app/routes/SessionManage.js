/**
 * 页面请求检查session, 如果没有session将重定向页面
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.checkSessionForPageRequest = function(req, res, next) {
    console.log('checkSessionForPageRequest')
    if (!req.session.user) {
        return res.redirect('/login');
    }

    next();
}

/**
 * 数据请求检查session, 如果没有session将返回403, 由前端进行重定向
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.checkSessionForDataRequest = function(req, res, next) {
    if (!req.session.user) {
        return res.status(401).send('session is timeout');
    }

    next();
}

/**
 * 判断是否为super admin
 */
exports.checkSessionForAdmin = function(req, res, next) {
    if (req.session.user.role <= 50) {
        return res.status(403).send('no authority!');
    }

    next();
}

/**
 * 判断是否为 user
 */
exports.checkSessionForUser = function(req, res, next) {
  if(req.session.user.role > 10) {
    return res.status(403).send('no authority!');
  }

  next();
}