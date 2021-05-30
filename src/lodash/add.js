const add = createMathOperation((a, b) => a + b, 0)

function createMathOperation(operator, defaultValue) {
    return (value, other) => {
        if (value === undefined && other === undefined) {
            return defaultValue
        }
        if (value !== undefined && other === undefined) {
            return value
        }
        if (other !== undefined && value === undefined) {
            return other
        }
        if (typeof value === 'string' || typeof other === 'string') {
            value = value + ''
            other = other + ''
        } else {
            value = +value
            other = +other
        }
        return operator(value, other)
    }
}
console.log(add('1', '2'), 123, 123)
