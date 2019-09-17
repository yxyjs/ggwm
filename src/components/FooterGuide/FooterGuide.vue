<template>
  <div class="page">
    <section class="guide-item" :class="{on : $route.path==='/msite'}" @click="goTo('/msite')">
      <span class="item-icon">
        <i class="iconfont icon-ziyuan"></i>
      </span>
      <span class="item-title">外卖</span>
    </section>
    <section class="guide-item" :class="{on : $route.path==='/search'}" @click="goTo('/search')">
      <span class="item-icon">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="item-title">搜索</span>
    </section>
    <section class="guide-item" :class="{on : $route.path==='/order'}" @click="goTo('/order')">
      <span class="item-icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span class="item-title">订单</span>
    </section>
    <section class="guide-item" :class="{on : $route.path==='/profile'}" @click="goTo('/profile')">
      <span class="item-icon">
        <i class="iconfont icon-xiazai"></i>
      </span>
      <span class="item-title">我的</span>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  methods: {
    goTo(path) {
      this.$router.replace(path);
    }
  },
  components: {}
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixins.styl'

.page
  top-border-1px(#ccc)
  z-index 100
  position fixed
  bottom 0
  left 0
  padding-top 6px
  width 100%
  display flex
  background-color #fff
  .guide-item
    flex 1
    display flex
    flex-direction column
    align-items center
    justify-content center
    &.on
      color #02a774
    .item-icon
      i
        font-size 24px
    .item-title
      font-size 14px
      height 24px
      line-height 24px
</style>
