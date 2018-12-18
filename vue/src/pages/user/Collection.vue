<template>
    <!-- 我的收藏 -->
<transition name='bounce'>
    <div class="browse-warp">
        <van-nav-bar
            title="我的收藏"
            left-arrow
            @click-left="goBack"
        />
        <Scroll  :pullup='true' @scrollToEnd='scrollToEnd'  :data='dataArr' class="scroll">
            <div>
                <GoodsList  :list='dataArr' :isCollection='isCollection' @details='details' @close='close'/>
            </div>
            <div v-if="!dataArr.length" class="null">
                 {{userName ?'暂无收藏~~' : '请先登录噢~~'}}
            </div>
            <div v-show="loading2" class="van-loading van-loading--circular van-loading--white" style="color: white;"><span class="van-loading__spinner van-loading__spinner--circular"><svg viewBox="25 25 50 50" class="van-loading__circular"><circle cx="50" cy="50" r="20" fill="none"></circle></svg></span></div>
        </Scroll>
        <router-view/>
    </div>
</transition>     
</template>

<script>
import Scroll from 'pages/other/Scroll'
import GoodsList from 'pages/other/GoodsList'
import {loading} from 'js/mixin'
import {mapMutations,mapGetters} from 'vuex'
import {page} from 'js/mixin'
export default {
    name: 'Collection',
    mixins: [loading,page],
    components: {
        Scroll,
        GoodsList,
    },

    computed: {
        ...mapGetters(['userName'])
    },

    data() {
        return {
            isCollection: true,
            list: [],
            isText: false,
            page: 1,
            loading2: false,
        }
    },

    created() {
        this.getCollection()
    },
    beforeRouteUpdate (to, from, next) {
        if (from.name == 'Details') {
            this.getCollection()
        }
        next()
        
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },

        async getCollection(flag) {
            if (!this.userName) {
                this.showFlag = false
                return
            }
            try {
                if (this.isLocked()) return // 必须等待上一次请求完成
                this.locked()//开始请求之前锁住
                this.loading2 = true
                const {data} = await this.Api.getCollection(this.page)
                if (data.code == 200) {
                    // this.showFlag = false
                    this.loading2 = false
                    this.setTotal(data.data.count)  // 总条数
                    this.unLocked() // 解锁
                    if (flag) {
                        this.setNewData(data.data.list)
                    } else {
                        this.dataArr = data.data.list
                    }
                } else {
                    this.isText = true
                }
            } catch (error) {
                this.unLocked() // 解锁
                this.Toast('网络错误')
                this.loading2 = false
            }
        },

        details(item) {
            this.setGoodDetails(item)
            this.$router.push({path:`/user/collection/details`,query: {id:item.cid}})
        },

        // 这里是取消收藏
        async close(item,index) {
            this.dataArr.splice(index,1)
            try {
                const {data} = await this.Api.cancelCollection(item.cid)
                if (data.code == 200) {
                    // this.getCollection()
                }
            } catch (error) {
                this.Toast('网络错误')
            }
        },

        ...mapMutations({
            setGoodDetails: 'GOODSDETAILS'
        }),

        // 上拉加载
        scrollToEnd() {
            if (this.dataArr.length >= 10) {
                if (this.hasMore()) {
                    this.page++
                    this.getCollection(true)
                } else {
                    this.Toast('没有更多数据了~~')
                }
            }
            
        }
    }
}
</script>

<style lang="stylus" scoped>
.browse-warp
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 500
    background #fff
    .scroll
        position fixed
        top 40px
        bottom 0px
        left 0
        right 0
        overflow hidden
        

</style>

