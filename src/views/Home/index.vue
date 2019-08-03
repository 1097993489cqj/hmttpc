<template>
    <div>
      <!-- 导航 -->
  <van-nav-bar title="首页|搜索" fixed/>
  <!-- 内容区域
  1.tabs切换
  2.list列表:加载更多+下拉刷新
  -->
  <van-tabs class="channel-tabs" v-model="activeChannelIndex">
      <van-tab :title="item.name"
      v-for="item in channels"
      :key="item.id"
      >
        <van-pull-refresh v-model="item.downPullLoading" @refresh="onRefresh">
<!-- 列表 van-list -->
<!--
 -->
           <van-list v-model="item.upPullLoading" :finished="item.upPullFinished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in item.articles" :key="item.art_id" :title="item.title">
              <template slot="label">
                <van-grid v-show="item.cover.type!==0" :border="false" :column-num="3">
                  <van-grid-item v-for="src in item.cover.images" :key="src">
                    <van-image :src="src" lazy-load />
                  </van-grid-item>
                </van-grid>
                <p>
                  <span>作者:{{item.aut_name}}</span>
                  &nbsp;
                  <span>评论 :{{item.comm_count}}</span>
                  &nbsp;
                  <!-- <span>时间:{{item.pubdate | relTime}}</span> -->
                  <span>时间:{{item.pubdate | relTime}}</span>
                  &nbsp; &nbsp;
                  <van-icon class="close" name="cross" @click="showMorActionDia()"></van-icon>
                </p>
              </template>
            </van-cell>
          </van-list>

        </van-pull-refresh>
      </van-tab>

    </van-tabs>

    <!-- 更多操作 -->
    <more-action v-model="isShowDiaMore"></more-action>
  </div>
</template>

<script>
import { getChannelsUserOrDefault } from '@/api/channel.js'
import { getArticles } from '@/api/article.js'
import { mapState } from 'vuex'
import MoreAction from './components/more-action.vue'
export default {
  name: 'HomeIndex',
  components: {
    MoreAction
  },
  data () {
    return {
      activeChannelIndex: 0,
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      channels: [], // [{id:0},{id:1}]
      isShowDiaMore: false
    }
  },
  created () {
    this.loadChannels()
  },
  // 监测store.state.user
  watch: {
    // data(newValue, oldValue){

    // }
    // list: (newV, oldV)=>{

    // }
    // 'list':()=>{}
    // 凡是可以使用this.出来的数据,都可以使用watch监测
    // this.$stor.state.user
    // '$store.state.user' () {

    // }
    user (newV, oldV) {
      console.log('--------')
      // 更新频道列表
      this.loadChannels()
      // 更新加载的动画
      this.activeChannel.upPullLoading = true
      // 更新文章列表
      // this.loadArticles()
      this.onLoad()
    }
  },
  computed: {
    ...mapState(['user']),
    activeChannel () {
      return this.channels[this.activeChannelIndex]
    }
  },
  methods: {
    // 点击->打开对话框
    showMorActionDia () {
      this.isShowDiaMore = true
    },
    async loadChannels () {
      // 取出本地数据
      const lsChannels = JSON.parse(window.localStorage.getItem('channels'))

      try {
        if (this.user || (!this.user && !lsChannels)) {
          const data = await getChannelsUserOrDefault()
          data.channels.forEach(item => {
            item.downPullLoading = false // 当前频道下拉状态
            item.upPullLoading = false
            item.upPullFinshed = false
            item.timestamp = Date.now() // 为每个频道添加默认时间戳属性
            item.articles = [] // 为了控制每个频道自己的文章列表数据
          })
          this.channels = data.channels
          // console.log(data)
        }
        if (!this.user && lsChannels) {
          this.channels = lsChannels
        }
      } catch (error) {
        console.dir(error)
      }
    },
    // 下拉刷新的方法
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 800)
    },

    // 获取文章列表数据
    async loadArticles () {
      const { id, timestamp } = this.activeChannel

      const data = await getArticles({
        // 当前激活的频道的id<-当前激活的频道<-activeChannel
        channel_id: id,
        // timestamp: Date.now(),
        // timestamp,
        timestamp,
        with_top: 1
      })
      return data
    },
    async onLoad () {
      console.log('----')
      // 延迟执行是一个独立作用的函数-> 多次使用
      // 1.函数
      // 2.模块.js
      // 3.挂在vue的实例上 -> this.$sleep()
      await this.$sleep(500)
      //
      let data = []
      data = await this.loadArticles()

      // 第一次发送请求
      if (data.pre_timestamp && data.results.length === 0) {
        // 更新timestamp时间戳
        this.activeChannel.timestamp = data.pre_timestamp
        // 根据当前的有效时间戳发送新请求
        data = await this.loadArticles()
      }

      // 所有数据加载完毕
      if (!data.pre_timestamp) {
        this.activeChannel.upPullLoading = false
        this.activeChannel.upPullFinished = true

        return
      }

      // 更新最新的时间戳
      this.activeChannel.timestamp = data.pre_timestamp
      // 时间戳 ->   频道数据channels  和  当前文章列表数据data.results
      this.activeChannel.articles.push(...data.results)
      // 停止加载中的动画
      this.activeChannel.upPullLoading = false
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
