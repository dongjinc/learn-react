import _ from 'lodash'
// console.log(_.chunk(['a', 'b', 'c', 'd'], 5))

function chunk(array, size = 1) {
    size = Math.max(size, 0)
    const length = array == null ? 0 : array.length
    if (!length || size < 1) {
        return []
    }
    const index = 0
    let resIndex = 0
    const result = new Array(Math.ceil(length / size))
    while (index < length) {
        result[resIndex++] = []
    }
}