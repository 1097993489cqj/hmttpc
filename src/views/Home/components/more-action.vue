<template>
  <van-dialog
    :value="value"
    closeOnClickOverlay
    @input="$emit('input')"
    :showConfirmButton="false"
    :show-confirm-button="false"
  >
    <van-cell-group v-if="!isReport">
      <van-cell icon="location-o" title="不感兴趣" @click="handleDislikeArticle" />
      <van-cell icon="location-o" title="反馈垃圾内容" is-link @click="isReport=true" />
      <van-cell icon="location-o" title="拉黑作者" />
    </van-cell-group>
    <van-cell-group v-else>
      <!-- 左按钮控制返回上一组结构 -->
      <van-cell icon="arrow-left" @click="isReport=false" />
      <van-cell
      @click="handleReportArticle(item)"
      :title="item.title" icon="location-o"
      v-for="item in isReportsType"
      :key="item.value"
      />
    </van-cell-group>
  </van-dialog>
</template>

<script>
import { dislikeArticle, reportArticleByIdAndType } from '@/api/article.js'

export default {
  name: 'MoreAction',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    currentArticle: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isReport: false,
      isReportsType: [
        { title: '其他问题', value: 0 },
        { title: '标题夸张', value: 1 },
        { title: '低俗色情', value: 2 },
        { title: '错别字多', value: 3 },
        { title: '旧闻重复', value: 4 },
        { title: '广告软文', value: 5 },
        { title: '内容不实', value: 6 },
        { title: '涉嫌违法犯罪', value: 7 },
        { title: '侵权', value: 8 }
      ]
    }
  },
  methods: {
    async handleReportArticle (item) {
      const { art_id: article_ID } = this.currentArticle
      console.log(item.value)

      try {
        await reportArticleByIdAndType({
          target: article_ID,
          type: item.value
        })

        // 移除当前文章->让父组件移动当前文章
        this.$emit('dislike-success')
        // 关闭对话框
        this.$emit('input', false)
        // 提示
        this.$toast('举报成功')
      } catch (error) {
        console.dir(error)
        if (error.response.status === 409) {
          this.$toast('已被举报过')
        } else {
          this.$toast('举报失败')
        // }
        }
      }
    },
    async handleDislikeArticle () {
      //   console.log(this.currentArticle)
      const { art_id: article_ID } = this.currentArticle
      //   console.log(article_ID)
      try {
      // 传递当前文章id<-自己声明<-形参<-已有数据props和data<-来源于外部<-文章列表组建
        const data = await dislikeArticle(article_ID)
        // 移除当前文章->让父组件移动当前文章
        this.$emit('dislike-success')
        // 关闭对话框
        this.$emit('input', false)
        // 提示
        this.$toast('操作成功')
        // console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang='less' scoped>
</style>
