<template>
    <!-- 我的收藏 -->
<transition name='bounce'>
    <div class="browse-warp">
        <BaseTitle :back='back' title="我的收藏" @goBack='goBack'/>
        <Scroll v-show="!showFlag" :data='list' class="scroll">
            <div>
                <GoodsList :list='list' :isCollection='isCollection' @datails='datails' @close='close'/>
            </div>
            <div v-if="!list.length" class="null">
                 {{userName&&!showFlag? '暂无收藏~~' : '请先登录噢~~'}}
            </div>
        </Scroll>
        <router-view/>
         <BaseLoding :showFlag='showFlag'/>
    </div>
</transition>     
</template>

<script>
import Scroll from 'pages/other/Scroll'
import BaseTitle from 'pages/other/BaseTitle'
import GoodsList from 'pages/other/GoodsList'
import {loading} from 'js/mixin'
import {mapActions,mapMutations,mapGetters} from 'vuex'
export default {
    name: 'Collection',
    mixins: [loading],
    components: {
        Scroll,
        BaseTitle,
        GoodsList,
    },

    computed: {
        ...mapGetters(['userName'])
    },

    data() {
        return {
            back: true,
            isCollection: true,
            list: [],
            isText: false
        }
    },

    created() {
        this.getCollection()
    },

    methods: {
        goBack() {
            this.$router.go(-1)
        },

        async getCollection() {
            if (!this.userName) {
                this.showFlag = false
                return
            }
            try {
                this.showFlag = true
                const {data} = await this.Api.getCollection()
                if (data.code == 200) {
                    this.showFlag = false
                    this.list = data.collection
                } else {
                    this.isText = true
                }
            } catch (error) {
                this.Toast('网络错误')
                this.showFlag = false
            }
        },

        datails(item) {
            console.log(item);
            
            this.setGoodDetails(item)
            this.$router.push({path:`/user/collection/${item.cid}`})
            setTimeout(() => {
                this.setBrowse(item)     // 加入最近浏览
            }, 300);
        },

        // 这里是取消收藏
        async close(item,index) {
            console.log(item);
            
            this.list.splice(index,1)
            try {
                const {data} = await this.Api.cancelCollection(item.cid)
                if (data.code == 200) {
                    this.Toast(data.msg);
                }
            } catch (error) {
                this.Toast('网络错误')
            }
        },

        ...mapActions(['setBrowse']),

        ...mapMutations({
            setGoodDetails: 'GOODSDETAILS'
        }),
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

