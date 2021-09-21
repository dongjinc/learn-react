let count = 1;
const container = document.getElementById('container')
function getUserAction(e){
    console.log(this, e)
    container.innerHTML = count++
}
// 第一版
// function debounce(func, wait){
//     let timeout;
//     return function(){
//         clearTimeout(timeout)
//         timeout = setTimeout(func, wait)
//     }
// }

// 第二版 this
function debounce(func, wait){
    let timeout;
    return function(){
        const context = this
        const arg = arguments
        clearTimeout(timeout)
        timeout = setTimeout(function(){
            // this和event
            func.apply(context, arg)
        }, wait)
    }
}
container.onmousemove = debounce(getUserAction, 1000)