<template>
    <!-- 商品列表组件 -->
        <ul>
        <li v-for="(item,index) in list" :key="item._id || item.id" class="good-item border-bottom" @click="details(item)">
            <img :src="item.image || item.image_path" :onerror="defaultImg" :class="{img2:isBrowse || isCollection || isOrder || isSearch}">
            <div>
                <p class="p1" v-html="keyWord(item.name,searchVal)"></p>
                <p class="p2">
                    <span class="pic" v-if="isOrder">￥{{(item.present_price * item.count).toFixed(2)}}</span>
                    <span class="pic" v-else>￥{{item.present_price}}</span>
                    <span class="orl-pic">{{item.orl_price}}</span>
                    <span class="count" v-if="isOrder">x{{item.count}}</span>
                </p>
                
            </div>
            <div class="icon" v-if="isBrowse || isCollection">
                    <van-icon name="close" class="close" @click.stop="close(item,index)"/>
                </div>
        </li>
        </ul>
</template>

<script>
import {details} from 'js/mixin'

export default {
    mixins:[details],
    props: {
        list: {
            type: null,
            default: []
        },

        isSearch: {
             type: Boolean,
            default: false
        },
        isBrowse: {
            type: Boolean,
            default: false
        },

        isCollection: {
            type: Boolean,
            default: false
        },

        isOrder: {
            type: Boolean,
            default: false
        },

        searchVal: {
            type: '',
            default: ''
        }

        
    },

    computed: {
        lists() {
            return this.isBrowse ? 'list': ''
        }
    },

    data() {
        return {
             defaultImg: 'this.src="' + require('img/vue.jpg') + '"',
        }
    },

    methods: {
        // details(item) {
        //     this.$emit('details',item)
        // },

        // 清除单条浏览记录
        close(item,index) {
            this.$emit('close',item,index)
        },

        //搜索高亮
        keyWord(str,value) {
            if (this.isSearch) {
                let replaceReg = new RegExp(value, 'g');
                let replaceString = `<span style='color:red'>${value}</span>`
                str = str.replace(replaceReg, replaceString);
                return str
            }
            return str
        },
    }
}
</script>

<style lang="stylus" scoped>
ul
    background #fff
    .good-item
        height 100px
        display flex
        padding 10px 15px
        box-sizing border-box
        position relative
        &.list-enter-active, &.list-leave-active 
            transition all .1s linear
        &.list-enter, &.list-leave-to
            height 0
        &:last-child:before
            border-bottom 0    
        img 
            flex 0 0 30%
            width 30%
            height 90%
            border 1px solid #eee
        .img2
            flex 0 0 25%
            width 25%
            height 100%    
        div 
            flex 1    
            p
                text-align left
                padding-left 20px
            .p1
                margin-bottom 20px
                line-height 1.4
                overflow:hidden; 
                text-overflow:ellipsis
                display:-webkit-box
                -webkit-box-orient:vertical
                -webkit-line-clamp:2
                font-size 13px
            .p2    
                .orl-pic
                    text-decoration: line-through
                    font-size 13px
                .count
                    float right    
                .pic
                    color #f00
                    font-weight 700
                    margin-right 5px 
        .icon
            position absolute
            display inline
            right 10px
            bottom 0
            .close
                padding 10px   

</style>
