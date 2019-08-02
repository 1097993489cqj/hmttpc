<template>
  <div id="app">

    <!-- <h3>使用vuex中的state的count</h3>
    <p>{{this.$store.state.count}}</p>
    <hr>
    <p>{{count}}</p> -->
    <keep-alive>

    </keep-alive>
    <router-view></router-view>

  </div>
</template>
<script>

export default {
  // 在组建中 使用vuex的state数据
  // 1.需要把state数据映射(修改为)为组件的computed
  // 2.利用vuex的辅助函数 mapState 简化代码
  // 2.1mapState是方法
  // 2.2mapState(的实参可以是['state中的数据名])
  // 2.3mapState()返回一个对象{count:function(){return this.$store.state.count}}

  computed: {
    // ...mapState(['count'])
    // count () {
    //   return this.$store.state.count
    // },
    // age () {
    //   return this.$store.state.age
    // }
  }
}
</script>
<style lang="less" scoped>
// 需求
// 自己的设计稿的参照尺寸 750
// div满屏宽->750px

</style>
