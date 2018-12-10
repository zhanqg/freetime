// forEach 遍历数组
const forEach = (arr, fn) => {
    for (let i = 0; i < arr.length; i++) {
        fn(arr[i]);
    }
}

// forEach遍历对象
const forEachObj = (obj, fn) => {
    for (const k in obj) {
        if (obj.hasOwnProperty(k)) {
            fn(k, obj[k])
        }
    }
}

// unless，如果flag为false就调用函数
const unless = (flag, fn) => {
    if (!flag) {
        fn()
    }
}

// 检查全部数组是否为一个数字
const every = (arr, fn) => {
    let flag = true
    for (const val of arr) {
        flag = flag && fn(val)
    }
    return flag
}

// 检查全部数组是否为一个数字，满足其中一个
const some = (arr, fn) => {
    let flag = true
    for (const val of arr) {
        flag = flag || fn(val)
    }
    return flag
}

// 排序
const sortBy = (protype) => {
    return (a, b) => {
        return a[protype] < b[protype] ? -1 : (a[protype] > b[protype] ? 1 : 0)
    }
}

// 计算缓存
const fact = (n) => {
    if (n === 0) {
        return 1
    }
    return n * fact(n - 1)
}

const mmemoize = (fn) => {
    let lookupTable = {}
    return (arg) => {
        return lookupTable[arg] || (lookupTable[arg] = fn(arg))
    }
}