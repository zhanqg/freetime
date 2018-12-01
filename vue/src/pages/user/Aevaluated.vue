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
            <div class="content border-bottom">内容：{{evaluateOne.evaluateOne.content}}</div>
            <div>
                <img :src="evaluateOne.goods.image_path" alt="" srcset="">
                <p>{{evaluateOne.goods.name}}</p>
                <p><van-icon name="cart" /></p>
            </div>
         </div>    
    </transition> 
</template>

<script>
import BaseTitle from 'pages/other/BaseTitle'
export default {
    data() {
        return {
            back: true,
            evaluateOne:''
        }
    },

    components: {
        BaseTitle,
    },

    methods: {
        goBack() {
            this.$router.go(-1)
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
</style>

