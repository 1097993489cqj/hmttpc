<template>
    <div>

<keep-alive>
<router-view></router-view>
</keep-alive>

    <van-tabbar active-color="#07c160" inactive-color="#000" v-model="activeIndex" route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
    </div>
</template>

<script>
export default {
  name: 'TaBbarIndex',
  data () {
    return {
      activeIndex: 1
    }
  }
}
</script>

<style lang="less" scope>

</style>
