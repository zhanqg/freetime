<template>
  <div id="app">
    <keep-alive exclude="ShoppingCart,Address,Collection,My,Details">
      <router-view/>
    </keep-alive>
    <div class="tab" v-show="payMent">
      <van-tabbar >
        <van-tabbar-item @click="change(index)" v-for="(val,index) of item" :key="val.id" :icon="val.icon" :class="{active:active==index}">
          {{val.title}}
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {
      payMent: true,
      item: [
        { id: 1, title: "商城", icon: "wap-home" },
        { id: 2, title: "分类", icon: "wap-nav" },
        { id: 3, title: "购物车", icon: "shopping-cart" },
        { id: 4, title: "我的", icon: "contact" }
      ]
    };
  },
  computed: {
    ...mapGetters(["active"])
  },

  methods: {
    change(i) {
      // console.log(i);
      
      const rout = this.$router;
      if (i == 0) {
        rout.push({ path: "/" });
      } else if (i == 1) {
        rout.push({ path: "/category" });
      } else if (i == 2) {
        rout.push({ path: "/shoppingCart" });
      } else {
        rout.push({ path: "/my" });
      }
    },

    ...mapMutations({
      setName: "USERNAME"
    }),

    async keeplogin() {
      try {
        const { data } = await this.Api.keeplogin();
        if (data.code == 200) {
          
          this.setName(data.userInfo);
        }
      } catch (error) {
        this.Toast("网络错误");
      }
    },
  },

  mounted() {
  },

  created() {
    this.keeplogin()
  //   let arr = [
  //     {id:1,rote: 1,title: 'es6'},
  //     {id:2,rote: 2,title: 'es7'},
  //     {id:3,rote: 3,title: 'es8',author: '阮一峰'},
  //     {id:4,rote: 4,title: 'es9',author: '不知道'},
  //   ]
  //   let arr2 = [
  //     {
  //       name:'begin',
  //       bookDetails: [
  //         {id:1,title: 'C#',author: 'ANDREW',rating: [4.7]},
  //         {id:2,title: 'JAVA',author: 'GISDSS',rating: [4.5]},
  //       ]
  //     },
  //     {
  //       name:'pro',
  //       bookDetails: [
  //         {id:3,title: 'VUE',author: 'HFKSDU',rating: [4.0]},
  //         {id:4,title: 'REACT',author: 'IYTMSD',rating: [4.2]},
  //       ]
  //     }
  //   ]
  
  // let details = [
  //   {id:1,reviews: [{goods:4,exce:12}]},
  //   {id:2,reviews: []},
  //   {id:3,reviews: []},
  //   {id:4,reviews: [{goods:14,exce:12}]},
  // ]
  // let concatAll = (arr) =>{
  //     let res = []
  //     for (const val of arr) {
  //       res.push.apply(res,val)
  //     }
  //     return res
  //   }

  // let zip = (leftArr,rightArr,fn) => {
  //   let res = []
  //   for (let i = 0; i < Math.min(leftArr.length,rightArr.length); i++) {
  //       res.push(fn(leftArr[i],rightArr[i]))
  //   }
  //   return res
  // }
  // const map = (arr,fn) => {
  //     let res = []
  //     for (const val of arr) {
  //       res.push(fn(val))
  //     }
  //     return res
  //   }
  // let book = concatAll(map(arr2,books => books.bookDetails))

  // let zipArr = zip(book,details,(a,b) => {
  //   if (a.id == b.id) {
  //     let clone = {...a}
  //     clone.review = b.reviews[0]
  //     return clone
  //   }
  // })
  // console.log(zipArr);
  



  // let arr3 = [
  //   {firstname: 'aa',lastname:'cc'},
  //   {firstname: 'cc',lastname:'bb'},
  //   {firstname: 'bb',lastname:'aa'},
  // ]
  //   const forEach = (arr,fn) => {
  //     for (const val of arr) {
  //       fn(val)
  //     }
  //   }


  //   const filter = (arr,fn) => {
  //     let res = []
  //     for (const val of arr) {
  //       (fn(val)) ? res.push(val) : undefined
  //     }
  //     return res
  //   }

  //   let res = filter(arr,item => {
  //     return item.id >2
  //   })

  //   let unless = (flag,fn) => {
  //     if (!flag) {
  //       fn()
  //     }
  //   }


  //   let arr5 = map(arr2,book => {
  //     return book.bookDetails
  //   })
    
  //   let arr6 = concatAll(map(arr2,book => {
  //     return book.bookDetails
  //   }))
  //   // console.log(arr6);
    
  //   // forEach([1,2,3,4],item => {
  //   //   unless(item % 2 == 0 ,() => {
  //   //     console.log(item);
  //   //   })
  //   // })
  //   let timer = (num,fn) => {
  //     for (let i = 0; i < num; i++) {
  //       fn(i)
  //     }
  //   }

  //   // timer(50,(n) => {
  //   //   unless(n%2==0,() => {
  //   //     console.log(n);
  //   //   })
  //   // })
  //   let every = (arr,fn) => {
  //     let flag = true
  //     for (const val of arr) {
  //       flag = flag && fn(val)
  //     }
  //     return flag
  //   }

  //   // every(arr,item => {
  //   //   console.log(item.id > 0);
  //   // })
  //   let nums = [1,11,21,13,435,0,67,564]
  //   let sortBy = (pro = undefined) => {
  //     return (a,b) => {
  //       if (pro!==undefined) {
  //         return a[pro] < b[pro] ? -1 : (a[pro] > b[pro] ? 1 :0)
  //       }
  //       return  a < b ? -1 : (a > b ? 1 :0)
  //     }
  //   }
    
  //   let once = (fn) => {
  //     let done = false
  //     return () => {
  //       return done ? undefined : ((done = true),fn.apply(this,arguments))
  //     }
  //   }

  //   // let doPlay = once(() => {
  //   //   console.log('to');
      
  //   // })
  //   // doPlay()
  //   let fact = (n) => {
  //     if (n === 0) {
  //       return 1
  //     }
  //     return n * fact(n-1)
  //   }

    
  //   let memoize = (fn) => {
  //     let lookupTable = {}
  //     return (arg) => {
  //       return lookupTable[arg] || (lookupTable[arg] = fn(arg))
  //     }
  //   }

  //   let fact2 = memoize(n => {
  //     if (n === 0) {
  //       return 1
  //     }
  //     return n * fact2(n-1)
  //   }) 
  //   // console.log(fact2(5));
    
  //   let numArr = [1,2,3]
  //   const reduce = (arr,fn) =>{
  //     let num = 0
  //     for (const val of arr) {
  //       num = fn(num,val)
  //     }
  //     return num
  //   }
  //   // console.log(reduce(numArr,(acc,val) => {
  //   //   return acc + val
  //   // }));
    
  //   const reduce2 = (arr,fn,initalValue) => {
  //     let num
  //     if (initalValue != undefined) {
  //       num = initalValue
  //     } else {  
  //       num = arr[0]
  //     }

  //     if (initalValue === undefined) {
  //       for (let i = 0; i < arr.length; i++) {
  //         num = fn(num,arr[i])
  //       }
  //     } else {
        
  //       for (const val of arr) {
  //         num = fn(num,val)
  //       }
  //     }
  //     return num
  //   }
    
  //   let num = reduce2(numArr,(acc,val) => {
  //     return acc + val
  //   },1)

  //   let arr7 = concatAll(map(arr2,book => {
  //     return book.bookDetails
  //   }))

  //   let numss = reduce2(arr7,(acc,bookDetails)=> {
  //     let newGoods = bookDetails.reviews[0] ? bookDetails.reviews[0].goods : 0
  //     let newExce = bookDetails.reviews[0] ? bookDetails.reviews[0].exce : 0
  //     return {goods:acc.goods+newGoods,exce: acc.exce+newExce }

  //   },{goods:0,exce:0})
  // console.log(numss);

}
};
</script>
<style>
.van-tabbar-item--active {
      color: #7d7e80
}
 
</style>

