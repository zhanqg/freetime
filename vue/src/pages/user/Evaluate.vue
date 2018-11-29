<template>
    <!-- 评价 -->
    <transition name='bounce'>
        <div class="evaluate-warp">
            <BaseTitle :back='back' title="评价中心" @goBack='goBack'/>
            <img :src="evaluateImg" class="evaluateImg" alt="">
            <van-tabs v-model="active" >
                <van-tab :title="val.title+ 10" v-for="val of tabs" :key="val.id">
                     <Scroll class="scroll">
                         <div class="warp">
                             <div class="item border-bottom" v-if="active==0" v-for="(val,index) in evaluateList" :key="index">
                                 <img :src="val.image_path" alt="" srcset="">
                                 <div>
                                     <p>{{val.name}}</p>
                                     <span><van-icon name="chat" />评论晒单</span>
                                 </div>
                             </div>
                             <div class="item border-bottom" v-if="active==1" v-for="(val,index) in evaluateList" :key="index">
                                 <img :src="val.img" alt="" srcset="">
                                 <div>
                                     <p>美洲鲜活波士顿龙虾 750g-800g/只（次日达）</p>
                                     <span><van-icon name="chat" />评论晒单</span>
                                 </div>
                             </div>
                         </div>
                     </Scroll>    
                </van-tab>
            </van-tabs>
            <!-- <Scroll v-show="!showFlag" :data='list' class="scroll"> -->
                <!-- <div>
                    <GoodsList :list='list' :isCollection='isCollection' @details='details' @close='close'/>
                </div>
                <div v-if="!list.length" class="null">
                    {{userName&&!showFlag? '暂无收藏~~' : '请先登录噢~~'}}
                </div> -->
            <!-- </Scroll> -->
            <!-- <router-view/> -->
            <!-- <BaseLoding :showFlag='showFlag'/> -->
        </div>
    </transition> 
</template>

<script>
import Scroll from 'pages/other/Scroll'
import BaseTitle from 'pages/other/BaseTitle'
export default {
    components: {
        Scroll,
        BaseTitle
    },
    
    data() {
        return {
            back: true,
            evaluateImg: require('img/evaluate.jpg'),
            active:0,
            tabs:[
                {id:0,title: '待评价',status:0,},
                {id:1,title: '已评价',status:1,},
            ],
            evaluateList: '',
        }
    },

    methods: {
        goBack() {
            this.$router.go(-1)
        }
    },

    async created() {
        try {
            const {data} = await this.Api.getMyOrder('evaluate')
            if (data.code == 200) {
                this.evaluateList = data.evaluate
                
            }
        } catch (error) {
             this.Toast('网络错误')
        }
    },
}
</script>
<style lang="stylus" scoped>
.evaluate-warp
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 500
    background #fff
    .evaluateImg
        width 100%
        height 160px
        object-fit cover
    .scroll
        position fixed
        top 230px
        bottom 0px
        left 0
        right 0
        overflow hidden
        .warp
            padding 0px 10px
            box-sizing border-box
            .item
                display flex
                margin-top 15px
                &:first-child
                    margin-top 0
                img 
                    width 30%
                    flex 0 0 30%
                    height 80px
                    object-fit scale-down
                    margin-right 10px
                    border-radius 5px
                div 
                    flex 1    
                    display flex
                    flex-direction column
                    justify-content space-between
                    padding 5px 0
                    box-sizing border-box
                    p
                        line-height 1.3
                        letter-spacing 1px
                    span 
                        align-self flex-end    
                        border 1px solid red
                        color red
                        padding 5px 10px
                        border-radius 15px
                        font-size 12px
                        i 
                            vertical-align middle
                            margin-right 5px
</style>

