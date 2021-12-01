const wrapper = function wrapAsync(func) {
    return function(req, res, next) {
        func(req, res, next).catch(err => next())
    }
}

module.exports = wrapper;