<template>
    <div id="my-warpper">
        <van-nav-bar title="会员中心" :left-arrow="false"/>
        <div class="avatar" v-if="!userName">
            <img
                src="http://img4.imgtn.bdimg.com/it/u=198369807,133263955&fm=27&gp=0.jpg"
                alt
                srcset
            >
            <p @click="login">登录/注册</p>
        </div>
        <div class="avatar" v-else>
            <img :src="userName.avatar" :onerror="defaultImg">
            <p class="usename">欢迎您：{{userName.nickname}}</p>
            <p @click="loginOut">退出登录</p>
            <van-icon name="setting" class="setting" @click="settingUser"/>
        </div>
        <div class="user-links van-row">
            <div
                class="van-col van-col--6 numlist"
                v-for="(val,index) in tabs"
                :key="val.status"
                @click="status(val.status)"
            >
                <van-icon :name="val.icon"/>
                <span>{{val.title}}</span>
                <span class="num" v-if="orderNum && orderNum[index]!=0">{{orderNum[index]}}</span>
            </div>
        </div>
        <van-cell-group class="user-group">
            <van-cell icon="records" title="全部订单" is-link @click="myOrder"/>
        </van-cell-group>

        <van-cell-group>
            <van-cell icon="star-o" title="收藏商品" is-link @click="collection"/>
            <van-cell icon="location-o" @click="address" title="地址管理" is-link/>
            <van-cell icon="eye-o" title="最近浏览" is-link @click="goBrowse"/>
        </van-cell-group>
        <UserInfo ref="userInfo"/>
        <transition name="fade">
            <router-view/>
        </transition>
    </div>
</template>

<script>
import UserInfo from "@/components/my/UserInfo";
import { goBack, vuexData } from "js/mixin";

export default {
    name: "My",
    mixins: [vuexData],

    components: {
        UserInfo
    },
    data() {
        return {
            show: false,
            defaultImg: 'this.src="' + require("img/vue.jpg") + '"',
            loading: false,
            orderNum: "", //订单数量，
            // 0,待付款 1，待发货 2，待收货 3，评价 4，已完成
            tabs: [
                { status: 1, icon: "balance-pay", title: "待付款" },
                { status: 2, icon: "free-postage", title: "待发货" },
                { status: 3, icon: "points", title: "待收货" },
                { status: 4, icon: "thumb-circle-o", title: "评价" },
                { status: 5, icon: "like-o", title: "已完成" }
            ]
        };
    },

    methods: {
        settingUser() {
            this.$refs.userInfo.showPop()
        },

        login() {
            this.$router.push({ path: "/login" });
        },

        address() {
            if (this.userName) {
                this.$router.push({ path: "/address" });
            } else {
                this.$router.push({ path: "/login" });
            }
        },

        collection() {
            this.$router.push({ path: "/collection" });
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
                this.$toast("网络错误");
            }
        },

        // 最近浏览
        goBrowse() {
            this.$router.push({ path: "/browse" });
        },

        myOrder() {
            this.$router.push({ path: "/order" });
        },

        status(i) {
            if (i == 4) {
                this.$router.push({ path: "/evaluate" });
            } else {
                if (i == 5) {
                    i = 4;
                }
                this.$router.push({ path: "/order", query: { status: i } });
            }
        }
    },

    async created() {
        try {
            const { data } = await this.Api.getOrderNum();
            if (data.code == 200) {
                this.orderNum = data.numList;
            }
        } catch (error) {
            this.$toast("网络错误");
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

.numlist {
    position: relative;
    width: 20%;
}
.numlist .num {
    position: absolute;
    right: 15px;
    top: -8px;
    color: #fff;
    background: #e0322b;
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    border-radius: 50%;
}
</style>