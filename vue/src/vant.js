// 用到的部分 vant 组件
import Vue from 'vue'
import {
    Tabbar, TabbarItem, Tab, Tabs, Sku, Tag, Col, Icon,
    Cell, CellGroup, Swipe, SwipeItem, GoodsAction, GoodsActionBigBtn,
    GoodsActionMiniBtn, Search, Row, Lazyload, Checkbox, SubmitBar,
    AddressList, AddressEdit, Area, Button, Popup, Field, DatetimePicker, Picker,
    Rate, Uploader, Loading, NavBar
} from 'vant'
Vue.use(Tabbar).use(TabbarItem).use(Tab).use(Tabs).use(Sku)
    .use(Tag).use(Col).use(Icon).use(Cell).use(CellGroup)
    .use(Swipe).use(SwipeItem).use(GoodsAction)
    .use(GoodsActionBigBtn).use(GoodsActionMiniBtn).use(Search)
    .use(Row).use(Checkbox).use(SubmitBar)
    .use(AddressList).use(AddressEdit).use(Area).use(Button).use(Popup)
    .use(Field).use(DatetimePicker).use(Picker).use(Rate).use(Uploader)
    .use(Loading).use(NavBar)

Vue.use(Lazyload, {
    preLoad: 1.3,
    loading: 'http://www.tuyiyi.com/images/201402/161ZJ2O-8.gif',
    attempt: 1
})