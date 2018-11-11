import {mapMutations} from 'vuex'
import BaseLoding from 'pages/other/BaseLoding'

export const details = {
    methods: {
        ...mapMutations({
            setGoodDetails: 'GOODSDETAILS'
        }),

        details(val) {
            this.setGoodDetails(val)
            this.$router.push({path:`/home/${val.goodsId}`})
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
    data() {
        return {
            routerName: false,    // 用来判断说明是不是从上一页过来
        }
    },

    methods: {
        back() {
            if (this.routerName) {
              this.$router.push({path: '/home'})
            } else {
              this.$router.go(-1)
            }
          }
    },

    beforeRouteEnter (to, from, next) {
        // 说明不是从上一页跳转过来的
        let flag = false
        if (!from.name) {
          flag = true
        }
        next(vm => {
          // 通过 `vm` 访问组件实例
          vm.routerName = flag
          console.log(vm.routerName);
          
        })
      },
}