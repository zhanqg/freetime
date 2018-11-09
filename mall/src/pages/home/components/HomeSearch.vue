<template>
<transition name='bounce'>
    <div class="search-content">
        <Scroll :data='list' class="scroll" >
            <ul>
                <li class="item border-bottom"  v-for="val of list" @click="details(val)" :key="val.id" v-html="keyWord(val.name,value)">
                </li>
            </ul>
            <div class="empty" v-show="len">暂无搜索结果~~</div>
        </Scroll>
    </div>

</transition>      
</template>

<script>
import Scroll from 'pages/other/Scroll'
import {mapMutations,mapActions} from 'vuex'
export default {
    props: {
        list: {
            ttype: Array,
            default: []
        },
        len: {
            type: Boolean,
            default: false
        },
        value: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            
        }
    },

    methods: {
        keyWords() {
             return keyWord()
        },

        details(val) {
            this.setBrowse(val)     // 加入最近浏览
            this.setGoodDetails(val)
            this.$emit('details',val.id)
        },
        ...mapMutations({
            setGoodDetails: 'GOODSDETAILS'
        }),

        ...mapActions(['setBrowse','setTab']),

        keyWord(str,value) {
            let replaceReg = new RegExp(value, 'g');
            let replaceString = `<span style='color:red'>${value}</span>`
            str = str.replace(replaceReg, replaceString);
            return str
        }
    },

    components: {
        Scroll
    }
}
</script>

<style lang="stylus" scoped>
.search-content
    position fixed
    top 44px
    left 0
    right 0
    bottom 0px
    z-index 500
    background #fff
    .scroll
        height: 100%;
        overflow: hidden;
        .item 
            height 50px
            line-height 50px
            padding 0 15px
            box-sizing border-box
    .empty
        text-align center
        margin-top 100px
        color #999        
</style>

