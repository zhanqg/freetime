<template>
    <transition name='bounce'>
    <!-- 商品评论 -->
    <div class="rate-warp">
        <BaseTitle :back='back' title="商品评分" @goBack='goBack'/>
        <div class="goods">
            <img :src="goodsOne.image_path" alt="" srcset="">
            <div>
                <p class="rate-txt">商品评分</p>
                <p class="rate"><van-rate color="#e0322b" v-model="rate" /></p>
            </div>
        </div>
        <div>
            <van-cell-group>
            <van-field
                v-model="message"
                type="textarea"
                placeholder="说说你的购买感受吧~~"
                rows="3"
                autosize
                maxlength='120'
            />
            </van-cell-group>
        </div>
        <div class="checkbox">
            <van-checkbox v-model="checked" checked-color="#e0322b">匿名评价</van-checkbox>
        </div>
        <div class="btn">
            <van-button type="primary" size="large" @click="submit">提交</van-button>
        </div>
        <!-- <van-uploader :after-read="onRead">
            <van-icon name="photograph" />
        </van-uploader> -->
    </div>
    </transition> 
</template>

<script>
import BaseTitle from 'pages/other/BaseTitle'
export default {
    data() {
        return {
            rate: 5,
            message: '',
            back: true,
            checked: false,
            goodsOne: '',
            id: '',  //商品id
            _id: '',   // 数据库单条id
            order_id: ''//  订单id
        }
    },

    components: {
        BaseTitle,
    },

    methods: {
        goBack() {
            this.$router.go(-1)
        },
        onRead(file) {
            console.log(file)
        },

        async submit() {
            if (!this.message) {
                return this.Toast('请输入需要提交的内容')
            }
            const datas = {
                id:this.id,
                rate:this.rate,
                content:this.message,
                anonymous:this.checked,
                _id:this._id,
                order_id:this.order_id
            }
            const {data} = await this.Api.comment(datas)
            if (data.code == 200) {
                this.Toast(data.msg)
                setTimeout(() => {
                    this.$router.go(-1)
                }, 1500);
                
            }
        }
    },

    async created() {
        this.id = this.$route.query.id
        this._id = this.$route.params._id
        this.order_id = this.$route.params.order_id
        try {
            const {data} = await this.Api.goodOne(this.id )
            if (data.code == 200) {
                this.goodsOne = data.goodsOne
            } else {
                this.Toast('请先登录')
            }
        } catch (error) {
            this.Toast('网络错误')
        }

    },
}
</script>

<style lang="stylus" scoped>
    .rate-warp
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        z-index 500
        background #fff
        .goods
            display flex
            padding-top 10px
            img 
                width 30%
                height 80px
                flex 0 0 30%
                object-fit scale-down
                margin-right 10px
                border-radius 5px
            div 
                flex 1
                display flex
                flex-direction column
                .rate-txt
                    margin-top 10px
                .rate
                    margin-top 20px
                .van-rate
                    display flex
                    flex-direction row
        .btn
            width 90%
            margin 30px auto        
        .checkbox
            padding-left 15px    
</style>

