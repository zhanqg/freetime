<template>
    <div>
        <van-nav-bar title="商品分类" :left-arrow='false' fixed/>
        <div class="content" >
           <div class="left" ref="left">
                <ul>
                    <li v-for='(val,index) in category' :key='val.mallCategoryId'  :class="{active:leftTabIndex==index}" @click="item(val,index)">
                        {{val.mallCategoryName}}
                    </li>
                </ul>
            </div>
            <div class="right" ref='right'>
                <div class="empty">
                        <van-tabs v-model="active" @click="onClick" >
                                <Scroll  v-show="!showFlag" :data='dataList' class="scroll" @scroll="scroll" :listenScroll='listenScroll' ref="scroll">
                                    <div>
                                        <van-tab v-for="val in list || category[0].bxMallSubDto" :title="val.mallSubName" :key="val.mallSubId">
                                            <GoodsList :list='dataList' @details='details'/>
                                        </van-tab>
                                    </div>
                                </Scroll>
                            
                            </van-tabs>
                        <div class="null" v-show="!dataList.length && !showFlag">
                            暂无数据~~
                        </div>
                </div>
            </div> 
        </div>
        <BaseLoding :showFlag='showFlag'/>
        <router-view />
    </div>
</template>
<script>
import {mapGetters,mapMutations,mapActions} from 'vuex'
import Scroll from '@/components/public/Scroll'
import GoodsList from '@/components/public/GoodsList'
import {loading,details,vuexData} from 'js/mixin'
export default {
    mixins: [loading,details,vuexData],

    data() {
        return {
            leftTabIndex: 0,
            list: '',
            active: 0,
            dataList: [],
            listenScroll: true,
            isLoading: false,
            defaultId : '2c9f6c946016ea9b016016f79c8e0000',
            Category: false
        }
    },

    
    components: {
        Scroll,
        GoodsList,
    },

    methods: {
        scroll(x,y) {
            console.log(x,y);
            
        },
        item(val,i) {
            this.active = 0
            this.list = val.bxMallSubDto
            if (this.leftTabIndex == i) return
            this.leftTabIndex = i
            let mallSubId = val.bxMallSubDto[0].mallSubId
            this.dataList = this.categoryTabList.hasOwnProperty(mallSubId) ?  this.dataList = this.categoryTabList[mallSubId] : this.getList(mallSubId)
            this.$refs.scroll.scrollTo(0,0,300)
        },

        onClick(index) {
            this.dataList = []
            const mallSubId = this.category[this.leftTabIndex].bxMallSubDto[index].mallSubId
            this.dataList = this.categoryTabList.hasOwnProperty(mallSubId) ?  this.dataList = this.categoryTabList[mallSubId] : this.getList(mallSubId)

        },

        change(index) {
            this.onClick(index)
        },

        async getList(id) {
            try {
                this.dataList = []
                this.showFlag = true
                const { data } = await this.Api.category(id)
                if (data.code == 200) {
                    this.showFlag = false
                    this.dataList = data.dataList
                    this.setCategoryTabList({
                        id,
                        list: data.dataList
                    })
                }
            } catch (error) {
                console.log(error);
                
                this.showFlag = false
                this.$toast('网络错误')
            }
        },


        async getCategory() {
            if (!this.category.length) {
                const { data } = await this.Api.recommend()
                if (data.code == 200) {
                    this.setTab(data.data.category)
                }
            }
        },

        categorys() {
            const id = this.$route.params.id
            const index = this.$route.params.index
            const val = this.$route.params.val
            console.log(id,index,val);
            
            if (id && index || index == 0 && val) {
                this.list = val.bxMallSubDto
                this.leftTabIndex = index
                this.getList(id)
            }  
        }
    },

    beforeRouteUpdate (to, from, next) {
        if (from.name !== 'Category') {
            this.Category = true
        }
        next()

    },
   

    activated() {
        this.categorys()
                    

    },

    created() {
        const id = this.$route.params.id
        const index = this.$route.params.index
        const val = this.$route.params.val
        if (id && index && val) {
            this.list = val.bxMallSubDto
            this.leftTabIndex = index
            this.getList(id)
            return
        }  
        this.getList(this.defaultId)
        this.getCategory()
    },
}
</script>

<style scoped lang="stylus">
.content
    display: flex
    position: fixed
    top 39px
    left 0
    right: 0
    bottom: 0
    // background: #EFEFEF
    .left
        flex: 0 0 80px
        background: #F1F8FF
        padding-bottom 55px
        height 100%
        overflow hidden
        ul
            height 100%
            overflow hidden
        .active
            background: #fff
        li
            color: #666
            height: 43px
            line-height: 43px
            font-size: 14px
            text-align center
            border-bottom: 1px solid #EFEFEF
    .right
        flex: 1
        .empty
            text-align: center
            font-size: 15px
            .null
                padding-top 30px
                box-sizing border-box
                color #bbb
            .scroll
                overflow hidden
                position fixed
                bottom 50px
                top 85px

</style>
// 姓名，电话