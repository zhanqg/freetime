<template>
    <!-- 评价 -->
    <transition name='bounce'>
        <div class="evaluate-warp">
            <BaseTitle :back='back' title="评价中心" @goBack='goBack'/>
            <img :src="evaluateImg" class="evaluateImg" alt="">
            <van-tabs v-model="active" >
                <van-tab :title="val.title+ 10" v-for="val of tabs" :key="val.id">
                     <Scroll class="scroll" v-if="active==0"  :data='alreadyEvaluatedList'  >
                         <div class="warp">
                             <div class="item border-bottom" v-for="(val,index) in evaluateList" :key="index">
                                 <img :onerror="defaultImg" :src="val.image_path" alt="" srcset="">
                                 <div>
                                     <p>{{val.name}}</p>
                                     <span @click="rate(val.cid,val._id,val.order_id)"><van-icon name="chat" />评论晒单</span>
                                 </div>
                                 
                             </div>
                             <h6 v-if="!evaluateList.length" class="noevaluate">
                                     暂无待评价商品~~
                              </h6>
                         </div>
                         <div v-show="loading" class="van-loading van-loading--circular van-loading--white" style="color: white;"><span class="van-loading__spinner van-loading__spinner--circular"><svg viewBox="25 25 50 50" class="van-loading__circular"><circle cx="50" cy="50" r="20" fill="none"></circle></svg></span></div>
                     </Scroll>    


                     <Scroll class="scroll" v-if="active==1"  :pullup='true' :data='dataArr'  @scrollToEnd='scrollToEnd2'>
                         <div class="warp">
                            
                              <h6 v-if="!dataArr.length " class="noevaluate">
                                    暂无已评价商品~~
                              </h6>
                             <div class="item border-bottom" v-for="(val,index) in dataArr" :key="index">
                                 <img :onerror="defaultImg" :src="val.goods[0].image_path" alt="" srcset="">
                                 <div>
                                     <p>{{val.goods[0].name}}</p>
                                     <span class="span2" @click="aevaluated(val.cid,val._id)"><van-icon name="search" />查看评价</span>
                                 </div>
                             </div>
                         </div>
                         <div v-show="loading2" class="van-loading van-loading--circular van-loading--white" style="color: white;"><span class="van-loading__spinner van-loading__spinner--circular"><svg viewBox="25 25 50 50" class="van-loading__circular"><circle cx="50" cy="50" r="20" fill="none"></circle></svg></span></div>

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
            <router-view></router-view>
        </div>
    </transition> 
</template>

<script>
import Scroll from 'pages/other/Scroll'
import BaseTitle from 'pages/other/BaseTitle'
import {page} from 'js/mixin'
export default {
    mixins:[page],
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
            count: 0,
            page: 1,
            page2:1,
            alreadyEvaluatedList: '',
            loading: false,
            loading2: false,
            defaultImg: 'this.src="' + require('img/vue.jpg') + '"',
        }
    },

    methods: {
        goBack() {
            this.$router.go(-1)
        },

        // 评价
        rate(id,_id,order_id) {
            this.$router.push({path:'/my/evaluate/rate',name:'Rate',query:{id},params:{_id,order_id}})
        },

        // 查看已评价
        aevaluated(id,_id) {
            this.$router.push({path:'/my/evaluate/aevaluated',name:'Aevaluated',query:{id},params:{_id}})
        },

        async tobeEvaluated() {
            try {
                const {data} = await this.Api.tobeEvaluated(this.page1)
                if (data.code == 200) {
                    this.evaluateList = data.data.list
                }
            } catch (error) {
                this.Toast('网络错误')
            }
        },

        async alreadyEvaluated(flag) {
            try {
                if (this.isLocked()) return // 必须等待上一次请求完成
                this.locked()//开始请求之前锁住
                this.loading2 = true
                const { data } = await this.Api.alreadyEvaluated(this.page)
                if (data.code == 200) {
                    this.loading2 = false
                    this.setTotal(data.data.count)  // 总条数
                    this.unLocked() // 解锁
                    if (flag) {
                        this.setNewData(data.data.list)
                    } else {
                        this.dataArr = data.data.list
                    }
                }
            } catch (error) {
                this.unLocked() // 解锁
                this.Toast('网络错误')
            }
            
        },

        async scrollToEnd() {
            
        },

        async scrollToEnd2() {
            if (this.dataArr.length >= 10) {
                if (this.hasMore()) {
                this.page++
                    this.alreadyEvaluated(true)
                } else {
                    this.Toast('没有很多数据了~~')
                }
            }
            
        }
    },


    async created() {
        this.tobeEvaluated()
        this.alreadyEvaluated()
    },

    beforeRouteUpdate (to, from, next) {
        if (from.name === 'Rate') {
            this.page = 1
           this.tobeEvaluated()
           this.alreadyEvaluated()
        }
        next()
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
            .noevaluate
                text-align center
                color #333
                margin-top 50px
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
                    .span2
                        color #333
                        border 1px solid #666
                    span 
                        align-self flex-end    
                        border 1px solid red
                        color red
                        padding 5px 10px
                        border-radius 15px
                        font-size 12px
                        i 
                            vertical-align -1px
                            margin-right 5px
</style>

