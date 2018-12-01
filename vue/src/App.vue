<template>
  <div id="app">
    <keep-alive exclude="ShoppingCart,Address,Collection,My,Details">
      <router-view/>
    </keep-alive>
    <div class="tab" v-show="payMent">
      <van-tabbar  @change='change'>
        <van-tabbar-item v-for="(val,index) of item" :key="val.id" :icon="val.icon" :class="{active:active==index}">{{val.title}}</van-tabbar-item>
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
    })
  },

  async created() {
    try {
      const { data } = await this.Api.keeplogin();
      if (data.code == 200) {
        this.setName(data.nickname);
      }
    } catch (error) {
      this.Toast("网络错误");
    }
    let arr = [
      { id: 1, age: 20, sex: "男" },
      { id: 1, age: 20, sex: "男" },
      { id: 2, age: 18, sex: "女" }
    ];

    const forEach = (arr, fn) => {
      for (let i = 0; i < arr.length; i++) {
        fn(arr[i]);
      }
    };

    // forEach([1,2,3],data => {
    //   console.log(data);
    // })
    const forEachObj = (obj, fn) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          fn(key, obj[key]);
        }
      }
    };

    // let obj = { a: 1, b: 2 };
    // forEachObj(obj,(k,v) => {
    //   console.log(k,v);
    // })
    const unless = (predicate, fn) => {
      if (!predicate) {
        fn();
      }
    };

    const timers = (times, fn) => {
      for (let i = 0; i < times; i++) {
        fn(i);
      }
    };
    // timers(100, n => {
    //   unless(n % 2, () => {
    //     console.log(n);
    //   });
    // });
    // const every = (arr,fn) => {
    //   let flag = true
    //   for (const val of arr) {
    //     flag = flag && fn(val)
    //   }
    //   return flag
    // }
    // const unary = fn => {
    //   return fn.length === 1 ? fn : arg =>fn(arg)
    // }
    // console.log([1,2,3,4].map(unary(parseInt)));
    // const memoized = fn => {
    //   const lookupTable = {};
    //   return arg => {
    //     return lookupTable[arg] || (lookupTable[arg] = fn(arg));
    //   };
    // };

    // let fast = memoized(n => {
    //   if (n === 0) {
    //     return 1;
    //   }
    //   return n * fast(n - 1);
    // });

    // console.log(fast(100));
    const map = (arr, fn) => {
      let res = [];
      for (const val of arr) {
        res.push(fn(val));
      }
      return res;
    };
    // console.log(map([2,3],x => x* 2));
    let arr2 = [
      {
        id: 111,
        title: "A#",
        author: "aaa",
        rating: [4.7],
        reviews: [{ good: 4, ex: 12 }],
        bookDetails: [{ ids: 1, a: 2 }]
      },
      {
        id: 222,
        title: "B#",
        author: "bbb",
        rating: [4.7],
        reviews: [{ good: 4, ex: 12 }],
        bookDetails: [{ ids: 1, a: 2 }]
      },
      {
        id: 333,
        title: "C#",
        author: "ccc",
        rating: [4.7],
        reviews: [{ good: 4, ex: 12 }],
        bookDetails: [{ ids: 1, a: 2 }]
      },
      {
        id: 444,
        title: "D#",
        author: "ddd",
        rating: [4.7],
        reviews: [{ good: 4, ex: 12 }],
        bookDetails: [{ ids: 1, a: 2 }]
      }
    ];

    arr2.forEach(item => {
     
    })
    // const newArr = arr2.map(item => {
    //   return {val_id: item.id}
    // })
    // const newArr2 = arr2.filter(item => {
    //   return item.id == 444
    // })
    // console.log(newArr);
    // console.log(newArr2);
    
    // const concatAll = (arr, fn) => {
    //   let res = [];
    //   for (const val of arr) {
    //     res.push.apply(res, val);
    //   }
    //   return res;
    // };
    // let newArr = concatAll(
    //   map(arr2, book => {
    //     return book.bookDetails;
    //   })
    // );
    // console.log(newArr);

    // let newArr = map(arr2, book => {
    //   return { title: book.title, author: book.author };
    // });
    // console.log(newArr);
    // let newarr = arr2.map(item => {
    //   return { title: item.title, author: item.author };
    // })
    // console.log(newarr);
    // const filter = (arr,fn) => {
    //   let res = []
    //   for (const val of arr) {
    //     fn(val) ? res.push(val) : undefined
    //   }
    //   return res
    // }
    // let newArr = filter(arr2,book => {
    //   return book.id === 111
    // })
    // console.log(newArr);
  }
};
</script>
<style lang='less'>
.van-tabbar-item--active {
  color: #e0322b;
}
</style>

