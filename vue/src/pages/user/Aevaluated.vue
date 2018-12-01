<template>
    <transition name='bounce'>
        <!-- 查看已评价 -->
        <div class="aevaluated-warp">
            <BaseTitle :back='back' title="评价详情" @goBack='goBack'/>
            <div v-if="evaluateOne" class="evaluateOne"> 
                <img :src="evaluateOne.evaluateOne.comment_avatar" alt="" srcset="">
                <div class="middle">
                    <span class="name">{{evaluateOne.evaluateOne.comment_nickname}}</span>
                    <p class="rate"><van-rate color="#e0322b" size='14' v-model="evaluateOne.evaluateOne.rate" /></p>
                </div>
                <div class="time">{{evaluateOne.evaluateOne.comment_time}}</div>
            </div>
            <div class="content border-bottom">评价内容：{{evaluateOne.evaluateOne.content}}</div>
            <div class="goods">
                <img :src="evaluateOne.goods.image_path" alt="" srcset="">
                <p class="name">{{evaluateOne.goods.name}}</p>
                <p class="cart" @click="addCard(evaluateOne.evaluateOne.cid)"><van-icon name="cart" /></p>
            </div>
            <div class="btn">
                <van-button type="primary" size="large" @click='goBack'>返回</van-button>
            </div>
         </div>    
    </transition> 
</template>

<script>
import BaseTitle from 'pages/other/BaseTitle'
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            back: true,
            evaluateOne:''
        }
    },

    computed: {
        ...mapGetters(['userName'])
    },

    components: {
        BaseTitle,
    },

    methods: {
        goBack() {
            this.$router.go(-1)
        },

        async addCard(id) {
            if (!this.userName) {
                this.$router.push({path:'/user/login'})
                return
            }
            try {
            const {data} = await this.Api.addShop(id)
            if (data.code == 200) {
                this.Toast(data.msg)
            }
            } catch (error) {
            this.Toast('网络错误')
            }
        }
    },

    async created() {
        let _id = this.$route.params._id
        
        try {
            const {data} = await this.Api.evaluateOne(_id)
            if (data.code == 200) {
                this.evaluateOne = data.data
                console.log(this.evaluateOne);
                
            }
        } catch (error) {
            this.Toast('网络错误')
        }
    },
} 
</script>

<style lang="stylus" scoped>
.aevaluated-warp
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 500
    background #fff
    .evaluateOne
        display flex
        padding 0 10px
        align-items center
        margin-top 10px
        .middle
            flex 1
        img 
            width 50px
            margin-right 15px
            flex 0 0 50px
            height: 50px;
            border: 1px solid #eee;
            border-radius: 50%;
        .name
            display block
            margin-bottom 10px    

        .time
            float right
            color #666
    .content
        margin 15px 10px 10px 10px
        padding-bottom 15px
    .goods
        display flex 
        padding 0 10px
        img 
            width 55px
            height 50px
            flex 0 0 55px   
            margin-right 10px
        .name
            flex 1
            line-height 1.6
        .cart
            flex 0 0 40px
            height 40px
            display flex
            align-items center
            justify-content center
            border-radius 50%
            text-align center
            background #FFE6E2
            margin-left 10px
            i 
                font-size 18px
                color red
    .btn
        width 90%
        margin 0 auto          
        position absolute
        left 50%
        bottom 10%
        transform translateX(-50%)  
</style>

