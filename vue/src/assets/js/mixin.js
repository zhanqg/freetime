import { mapMutations, mapGetters,mapActions } from 'vuex'
import BaseLoding from 'pages/other/BaseLoding'

export const details = {
    methods: {
        ...mapMutations({
            setGoodDetails: 'GOODSDETAILS',
        }),
        ...mapActions(['setBrowse']),
        details(val) {
            this.setGoodDetails(val)
            this.setBrowse(val)     // 加入最近浏览
            this.$router.push({ path: `/home/details`, query: { id: val.goodsId || val.id} })
        }
    }
}

export const loading = {
    data() {
        return {
            showFlag: true,     //是否显示lodding
        }
    },

    components: {
        BaseLoding,
    },
}

// 返回上一页或者首页
export const goBack = {
    methods: {
        back() {
            window.history.length > 1
                ? this.$router.go(-1)
                : this.$router.push('/home')

        }
    },
}