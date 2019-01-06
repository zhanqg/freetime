<template>
    <!-- 最近浏览 -->
    <div class="browse-warp">
        <van-nav-bar
                title="最近浏览"
                left-arrow
                @click-left="goBack"
            />
        <Scroll :data='browse' class="scroll">
            <div>
                <GoodsList :list='browse' :isBrowse='isBrowse' @close='close' @details='details'/>
            </div>
            <div v-if="!browse.length" class="null">
                暂无最近浏览~~
            </div>
        </Scroll>
        <router-view/>
    </div>
</template>

<script>
import Scroll from '@/components/public/Scroll'
import GoodsList from '@/components/public/GoodsList'
import {details,vuexData} from 'js/mixin'
export default {
    mixins: [details,vuexData],
 
    components: {
        Scroll,
        GoodsList,
    },

    data() {
        return {
            isBrowse: true
        }
    },

    methods: {
        goBack() {
            this.$router.go(-1)
        },

        close(item) {
            this.deleteOne(item.id)
        },
      
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

