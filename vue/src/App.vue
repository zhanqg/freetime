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
      console.log(i);
      
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
    // let arr = [
    //   {id:1,rote: 1,title: 'es6'},
    //   {id:2,rote: 2,title: 'es7'},
    //   {id:3,rote: 3,title: 'es8',author: '阮一峰'},
    //   {id:4,rote: 4,title: 'es9',author: '不知道'},
    // ]

    // const filter = (arr,fn) => {
    //   let res = []
    //   for (const val of arr) {
    //     (fn(val)) ? res.push(val) : undefined
    //   }
    //   return res
    // }
    // const map = (arr,fn) => {
    //   let res = []
    //   for (const val of arr) {
    //     res.push(fn(val))
    //   }
    //   return res
    // }

    // const concatAll = (arr,fn) => {
    //   let res = []
    //   for (const val of arr) {
    //     res.push.apply(res,val)
    //   }
    //   return res
    // }

    // let arr1 = filter(arr,item => {
    //   return item.rote > 2
    // })
    // let arr2 = map(arr1, item => {
    //   return {title: item.title,author:item.author}
    // })

  //   let arr3 = map(filter(arr,item => item.rote > 2),val => {
  //     return {title: val.title,author:val.author}
  //   })
  // console.log(arr3);

    // let arr2 = filter(arr,item => {
    //   return item.rote > 1
    // })

  // let arr = [
  //   {
  //     name:'begin',
  //     bookDetails: [
  //       {id:1,title: 'C#',author: 'ANDREW',rating: [4.7]},
  //       {id:2,title: 'JAVA',author: 'GISDSS',rating: [4.5]},
  //     ]
  //   },
  //   {
  //     name:'pro',
  //     bookDetails: [
  //       {id:3,title: 'VUE',author: 'HFKSDU',rating: [4.0]},
  //       {id:4,title: 'REACT',author: 'IYTMSD',rating: [4.2]},
  //     ]
  //   }
  // ]
  
  // let details = [
  //   {id:1,reviews: [{goods:4,exce:12}]},
  //   {id:2,reviews: []},
  //   {id:3,reviews: []},
  //   {id:4,reviews: [{goods:14,exce:12}]},
  // ]
  // let arr2 = map(arr,item => {
  //   return item.bookDetails
  // }).flat(2)
  
  // let zip = (leftArr,rightArr,fn) => {
  //   let res =[]
  //   for (let index = 0; index < Math.min(leftArr.length,rightArr.length); index++) {
  //     res.push(fn(leftArr[index],rightArr[index]))
  //   }
  //   return res
  // }
  // let arr3 = zip(arr2,details,(x,y) => {
  //   if (x.id === y.id) {
  //     let clone = {...x}
  //     clone.ratings = y.reviews
  //     return clone
  //   }
  // })
  // console.log(arr3);
  
  // let arr3 = arr2.reduce((acc,boolDetail) => {
  //   let goodReviews = boolDetail.reviews[0] != undefined ? boolDetail.reviews[0].goods : 0
  //   let goodExce = boolDetail.reviews[0] != undefined ? boolDetail.reviews[0].exce : 0
  //   return {goods:acc.goods + goodReviews,exce: acc.exce+goodExce}
  // },{goods:0,exce:0})

  }
};
</script>
<style>
.van-tabbar-item--active {
      color: #7d7e80
}
 
</style>

