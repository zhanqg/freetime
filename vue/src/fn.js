//   let arr = [
//     {id:1,rote: 1,title: 'es6'},
//     {id:2,rote: 2,title: 'es7'},
//     {id:3,rote: 3,title: 'es8',author: '阮一峰'},
//     {id:4,rote: 4,title: 'es9',author: '不知道'},
//   ]
let arr2 = [
    {
        name: 'begin',
        bookDetails: [
            { id: 1, title: 'C#', author: 'ANDREW', rating: [4.7] },
            { id: 2, title: 'JAVA', author: 'GISDSS', rating: [4.5] },
        ]
    },
    {
        name: 'pro',
        bookDetails: [
            { id: 3, title: 'VUE', author: 'HFKSDU', rating: [4.0] },
            { id: 4, title: 'REACT', author: 'IYTMSD', rating: [4.2] },
        ]
    }
]

// let details = [
//   {id:1,reviews: [{goods:4,exce:12}]},
//   {id:2,reviews: []},
//   {id:3,reviews: []},
//   {id:4,reviews: [{goods:14,exce:12}]},
// ]


let arr = [1, 2, 3]
const forEach = (arr, fn) => {
    for (const val of arr) {
        fn(val)
    }
}

const uless = (flag, fn) => {
    if (!flag) {
        fn()
    }
}

const times = (num, fn) => {
    for (let i = 0; i < num; i++) {
        fn(i)
    }
}

const every = (arr, fn) => {
    let flag = true
    for (const val of arr) {
        flag = fn(val) && flag
    }
    return flag
}


const some = (arr, fn) => {
    let flag = false
    for (const val of arr) {
        flag = fn(val) || flag
    }
    return flag
}
let sortArr = [
    { first: 'aa', last: 'cc' },
    { first: 'cc', last: 'bb' },
    { first: 'bb', last: 'aa' },
]
const sortBy = (name) => {
    return (a, b) => {
        return a[name] < b[name] ? -1 : a[name] > b[name] ? 1 : 0
    }
}
// console.log(sortArr.sort(sortBy('last')));

const once = (fn) => {
    let done = false
    return () => {
        return done ? undefined : (done = true, fn())
    }
}
let doPlay = once(() => {
    console.log(1111);
})


const fact = (n) => {
    if (n === 0) {
        return 1
    }
    return n * fact(n - 1)
}

const cache = (fn) => {
    let lookup = {}
    return (arg) => {
        return lookup[arg] || (lookup[arg] = fn(arg))
    }
}
let fact2 = cache(n => {
    if (n === 0) {
        return 1
    }
    return n * fact2(n - 1)
})
console.log(fact2(5));

// doPlay()
// times(100,num => {
//     uless(num % 2, () => {
//         console.log(num);
//     })
// })
// forEach(arr, fn => {
//     uless(fn % 2, () => {
//         console.log(fn);
//     })
// })

let arr5 = [
    { a: 1, b: 1 },
    { a: 2, b: 2 },
    { a: 3, b: 3 },
]
const map = (arr, fn) => {
    let res = []
    for (const [index, val] of arr.entries()) {
        res.push(fn(val, index, arr))
    }
    return res
}

// map(arr5,(val,index,arr) => {
// console.log(val,index,arr);
// })

const filter = (arr, fn) => {
    let res = []
    for (const val of arr) {
        fn(val) ? res.push(val) : undefined
    }
    return res
}
let a = filter(arr5, val => {
    return val.a > 1
})

const concat = (arr) => {
    let res = []
    for (const val of arr) {
        res.push.apply(res, val)
    }
    return res
}
let newArr = [[1,2],[3,4],[5,[6]]]
let arrs = map(arr2, item => {
    return item.bookDetails
})
let arrs2 = concat(map(arr2, item => item.bookDetails))
console.log(arrs2);

// Math.min.apply(null,[1,2,3,4,5,6])
// result.push.apply(result,arr)
// result调用了push方法，并把arr数组里面的参数一个一个传递给push
