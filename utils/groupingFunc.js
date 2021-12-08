module.exports.grouping = (objArr, prop) => {
    return objArr.reduce((acc, obj) => {
        let key = obj[prop]
        if(!acc[key]) {
            acc[key] = []
        }
        acc[key].push(obj)
        return acc
    }, {})
}