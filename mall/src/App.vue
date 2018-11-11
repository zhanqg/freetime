<template>
  <div id="app">
    <keep-alive exclude="ShoppingCart,Address,Collection">
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
import {mapMutations,mapGetters} from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      payMent: true,
      item: [
        {id:1,title:'商城',icon:'wap-home'},
        {id:2,title:'分类',icon:'wap-nav'},
        {id:3,title:'购物车',icon:'shopping-cart'},
        {id:4,title:'我的',icon:'contact'}
      ]
    }
  },
  computed: {
    ...mapGetters(['active'])
  },

  methods: {
    change(i) {
      const rout = this.$router
      if (i == 0) {
        rout.push({'path': '/'})
      } else if (i == 1) {
        rout.push({'path': '/category'})
      } else if ( i == 2) {
        rout.push({'path': '/shoppingCart'})
      } else {
        rout.push({'path': '/my'})
      }
    },

    ...mapMutations({
      setName: 'USERNAME'
    }),

  },

  async created() {
    const name = this.$router.history.current.name
    const fullPath = this.$router.history.current.fullPath
    // if (name === 'Category') {
    //   this.active = 1
    // } else if (name === 'ShoppingCart') {
    //   this.active = 2
    // } else if (name === 'My') {
    //   this.active = 3
    // } else {
    //   this.active = 0
    // }
    // const arr = ['/user/address','/user/addressEdit','/user/collection','/my/browse','/my/order']
    // if (arr.includes(fullPath)) {
    //   this.active = 3
    // }else if(fullPath=== '/shoppingCart/ShoppingPayMent') {
    //     this.payMent = false
    // } 
    try {
      const {data} = await this.Api.keeplogin()
      if (data.status == 1) {
        this.setName(data.username)
      }
    } catch (error) {
      this.Toast('网络错误')
    }
    
  },
  watch: {
    // $route(to,from){
    //   if (to.path === '/home' || to.path == '/') {
    //     this.active = 0
    //   }
    //   if (to.path === '/shoppingCart') {
    //     this.active = 2
    //   }
    //   if (to.path === '/category') {
    //     this.active = 1
    //   }
    //   if(to.path === '/shoppingCart/ShoppingPayMent') {
    //     this.payMent = false
    //   } else {
    //     setTimeout(() => {
    //       this.payMent = true
    //     }, 300);
    //   }
    // }
  }
}
</script>
<style lang='less'>
 .van-tabbar-item--active {
    color:#E0322B;
}
</style>

