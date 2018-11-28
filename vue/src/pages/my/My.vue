<template>
  <div>
    <BaseTitle title="会员中心"/>
    <!-- <img class="user-poster" src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png"> -->
    <div class="avatar" v-if="!userName">
      <img src="http://img4.imgtn.bdimg.com/it/u=198369807,133263955&fm=27&gp=0.jpg" alt="" srcset="">
      <p @click="login">登录/注册</p>
    </div>
     <div class="avatar" v-else>
      <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3909870665,3259015587&fm=27&gp=0.jpg">
      <p class="usename">欢迎您：{{userName}}</p>
      <p @click="loginOut">退出登录</p>
      <van-icon name="setting" class="setting" @click="setting"/>
    </div>
    <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link @click="myOrder"/>
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="exchange" title="收藏商品" is-link @click="collection"/>
      <van-cell icon="gold-coin" @click="address" title="地址管理" is-link />
      <van-cell icon="gift" title="最近浏览" is-link @click="browse"/>
    </van-cell-group>
    <van-popup v-model="show" position="right" class="popup" :overlay="false">
      <BaseTitle title="个人资料"  :back='back' @goBack='show=false'/>
      <van-cell-group>
        <p @click="noName">
          <van-field
            v-model="username"
            disabled
            clearable
            label="用户名"
            placeholder="请输入用户名"
          />
        </p>

        <van-field
          v-model="nickname"
          clearable
          label="昵称"
          placeholder="请输入昵称"
        />
        <p @click="showGender=true"  class="gender">
          <van-field
            v-model="gender"
            clearable
            disabled
            label="性别"
            placeholder="男"
          />
        </p>
        
        <van-field
          v-model="email"
          clearable
          label="邮箱"
          placeholder="请输入邮箱"
        />
        <p @click="showBirth = true;"  class="birth">
        <van-field
          v-model="birth"
          clearable
          disabled
          label="出生年月"
          placeholder="出生年月"
        />
        </p>
    </van-cell-group>
    <van-popup v-model="showBirth" position="bottom" :overlay="true">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm='confirm'
          @cancel='showBirth = false'
        />
    </van-popup>
    <van-popup v-model="showGender" position="bottom" :overlay="true">
      <van-picker class="gender-picker" :columns="columns" @change="onChange" 
          show-toolbar
          title="性别"
          @cancel="showGender=false"
          @confirm="showGender=false"/>
        </van-popup>
      <div class="normal">
        <van-button size="normal"  class="normal-btn" type="primary" @click="post" :loading='loading'>保存</van-button>
        <van-button @click="show=false" size="normal"  class="normal-btn normal-btn-default" >取消</van-button>
      </div>
    </van-popup>
    <router-view/>
  </div>
</template>

<script>
import BaseTitle from "pages/other/BaseTitle";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    BaseTitle
  },

  data() {
    return {
      show: false,
      nickname: '',
      username: "",
      gender: "男",
      email: "",
      back: true,
      currentDate: new Date(),
      columns: ["男", "女", "保密"],
      maxDate: new Date(),
      minDate: new Date(1937, 12, 31),
      birth: "", // ,出生年月
      showBirth: false,
      showGender: false,
      year: "",
      month: "",
      day: "",
      loading: false
    };
  },

  computed: {
    ...mapGetters(["userName"])
  },

  methods: {
    ...mapMutations({
      setName: "USERNAME"
    }),

    noName() {
      this.Toast('用户名暂时不能修改哟~~')
    },

    login() {
      this.$router.push({ path: "/user/login" });
    },

    address() {
      if (this.userName) {
        this.$router.push({ path: "/user/address" });
      } else {
        this.$router.push({ path: "/user/login" });
      }
    },

    collection() {
      this.$router.push({ path: "/user/collection" });
    },

    // 退出登录
    async loginOut() {
      try {
        const { data } = await this.Api.loginOut();
        if (data.code == 0) {
          window.location.reload();
          localStorage.clear();
        }
      } catch (error) {
        this.Toast("网络错误");
      }
    },

    // 最近浏览
    browse() {
      this.$router.push({ path: "/my/browse" });
    },

    myOrder() {
      this.$router.push({ path: "/my/order" });
    },

    // 修改用户资料
    async setting() {
      this.show = true;
      try {
        const { data } = await this.Api.user();
        this.username = data.username;
        this.gender = data.gender;
        this.birth = data.year + "年" + data.month + "月" + data.day + "日";
        this.year = data.year;
        this.month = data.month;
        this.day = data.day;
        this.email = data.email;
        this.id = data._id;
        this.nickname = data.nickname
      } catch (error) {
        this.Toast("获取用户信息失败");
      }
    },

    confirm(val) {
      let d = new Date(val);
      this.year = d.getFullYear();
      this.month = d.getMonth() + 1;
      this.day = d.getDate();
      this.birth = this.year + "年" + this.month + "月" + this.day + "日";
      this.showBirth = false;
    },

    onChange(picker, value) {
      console.log(`当前值：${value}`);
      this.gender = value;
    },

    // 保存
    async post() {
      this.loading = true
      let datas = {
        gender: this.gender,
        email: this.email,
        year: this.year,
        month: this.month,
        day: this.day,
        id: this.id,
        nickname: this.nickname
      };
      try {
        const { data } = await this.Api.saveUser(datas);
        if (data.code == 200) {
          this.loading = false
          this.setName(this.nickname)
          this.Toast(data.msg);
        } else {
          this.Toast(data.msg);
          this.loading = false
        }
      } catch (error) {
        this.loading = false
        this.Toast("修改失败,网络错误");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.avatar {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  background: #e30c7b;
  padding: 10% 0 10% 0;
  box-sizing: border-box;
  position: relative;
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  p {
    color: #fff;
    font-size: 14px;
    margin-top: 20px;
  }
}
.user {
  &-poster {
    width: 100%;
    height: 100%;
    display: block;
  }
  &-group {
    margin-bottom: 0.3rem;
  }
  &-links {
    padding: 15px 0;
    font-size: 14px;
    text-align: center;
    background-color: #fff;
    .van-icon {
      display: block;
      font-size: 24px;
      margin-bottom: 10px;
    }
  }
}
.van-cell {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  padding: 10px 15px;
  box-sizing: border-box;
  position: relative;
  background-color: #fff;
  color: #333;
  font-size: 14px;
  overflow: hidden;
  align-items: center;
  .van-cell__left-icon {
    font-size: 16px;
    line-height: 24px;
    margin-right: 5px;
  }
  .van-cell__right-icon {
    color: #999;
    font-size: 12px;
    line-height: 35px;
    margin-left: 5px;
  }
}
.usename {
  font-weight: 700;
  font-size: 18px !important;
}
.setting {
  color: #eee;
  font-size: 20px;
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 10px;
}
.popup {
  height: 100%;
  width: 100%;
  background: #fff;
}
.normal {
  margin-top: 50px;
  text-align: center;
}
.normal-btn {
  width: 80%;
}
.normal-btn-default {
  margin-top: 10px;
}
</style>