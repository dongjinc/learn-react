// http://blog.houfeng.net/2014/12/15/javascript-wraper/

// Symbol包装器对象，围绕原始数据类型创建一个显式包装对象从es6开始不再被支持
// 原始包装器对象，如 new Boolean new String new Number 因遗留原因仍可被创建

/**
 * 概念
 * 原始类型 -> 包装器对象
 * 包装对象实例方法
 * 原始类型自动转换
 */
// 原始类型自动转换
// 

const a = {
    valueOf() {
        console.log(123)
        return 1
    }
}