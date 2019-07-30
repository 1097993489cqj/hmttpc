<template>
    <div>
      <!-- 导航 -->
  <van-nav-bar title="首页|搜索" fixed/>
  <!-- 内容区域
  1.tabs切换
  2.list列表:加载更多+下拉刷新
  -->
  <van-tabs class="channel-tabs" v-model="activeChannelIndex">
      <van-tab title="推荐">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
<!-- 列表 van-list -->
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>

        </van-pull-refresh>
      </van-tab>
       <van-tab title="推荐"></van-tab>

    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  data () {
    return {
      activeChannelIndex: 0,
      list: [],
      loading: false,
      finished: false,
      isLoading: false
    }
  },
  methods: {
    // 下拉刷新的方法
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    },
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
// 调整tabs样式
// 只针对当前的组件生效->公共的样式
// 解决方案:如果在scoped的前提下->也能选择当前的类名van-tabs_wrap->vue文档scoped具体用法
// 1.scoped作用当前作用域
// 2.深度选择-> // /deep/

// 调整tabs整体底部的距离->为了能看到"没更多数据"
.channel-tabs {
  margin-bottom: 100px;
}
// // 调整tab栏的位置
.channel-tabs /deep/ .van-tabs__wrap {
  position: fixed;
  top: 92px;
}
// // 调整tabs内容的位置
.channel-tabs /deep/ .van-tabs__content {
  margin-top: 192px;
}
</style>
