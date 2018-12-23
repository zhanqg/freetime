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

}
};
</script>
<style>
.van-tabbar-item--active {
      color: #7d7e80
}
 
</style>

