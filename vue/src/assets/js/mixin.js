import { mapMutations, mapGetters,mapActions } from 'vuex'
import BaseLoding from '@/components/public/BaseLoding'

export const details = {
    methods: {
        ...mapMutations({
            setGoodDetails: 'GOODSDETAILS',
        }),
        details(val) {
            this.setGoodDetails(val)
            this.$router.push({ path: `/details`, query: { id: val.goodsId || val.id || val.cid} })
        }
    }
}


export const vuexData = {
    computed: {
        ...mapGetters([
            'category',
            'categoryTabList',
            'goodsDetails',
            'userName',
            'addressInfo',
            'browse',
            'shopOrderList',
            'temporaryAddress',
            'city',
            'active',
            'searchHistoryList'
        ])
    },

    methods: {
        ...mapMutations({
            setName: "USERNAME",
            setGoodDetails: 'GOODSDETAILS',
            setAddress2: 'TEMPORARYADDRESS',
            setShopList: "SHOPORDERLIST",
            setVuexAddress:'TEMPORARYADDRESS'
        }),

        ...mapActions([
            'setTab',
            'setCategoryTabList',
            'setAddress',
            'clearAddress',
            'setBrowse',
            'deleteOne',
            'selectCity',
            'setSearchHistory',
            'clearSearchHistory'
        ])
    },
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

export const page = {
    data() {
        return {
            dataArr: [],
            total: null,
            loading: false, // 锁
        }
    },

    methods: {
        // newArr, 第二页请求到的数据
        setNewData(newArr) {
            this.dataArr  = this.dataArr.concat(newArr)
        },

        // 起始的记录数
        getCurrentStart() {
            return this.dataArr.length
        },

        // 是否还有更多数据加载
        hasMore() {
            // 说明没有数据要加载了
            console.log(this.dataArr.length);
            console.log(this.total);
            
            if (this.dataArr.length >= this.total) {
                return false
            }
            return true
        },

        // 总条数
        setTotal(total) {
            this.total = total
        },

        // 清空数组
        clearArr() {
            this.setData({
                dataArr: []
            })
            this.total = null
        },

        // 锁的机制
        isLocked() {
            return this.loading ? true : false
        },

        // 加锁
        locked() {
            this.loading = true
        },

        unLocked() {
            this.loading = false
        }
    }
}
