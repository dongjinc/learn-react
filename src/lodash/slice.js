
import _ from 'lodash'
console.log(_.slice([1, 2, 3, 4], 1, null))

function slice(array, start, end) {
    let length = array == null ? 0 : array.length
    if (!length) {
        return []
    }
    start = start == null ? 0 : start
    end = end === undefined ? length : end
    if (start < 0) {
        start = -start > length ? 0 : (length + start)
    }
    end = end > length ? length : end
    if (end < 0) {
        end += length
    }
    length = start > end ? 0 : ((end - start) >>> 0)
    start >>>= 0
    const result = new Array(length)
    let index = -1
    while (++index < length) {
        result[index] = array[index + start]
    }
    return result
}
console.log(slice([1, 2, 3, 4], 1, null))
// 0 0 0 0