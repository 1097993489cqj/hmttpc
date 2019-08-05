// 文章相关的api

import request from '@/utils/request.js'

/**
 * 当前激活的频道对应的文章列表
 * channel_id是频道ID
 * timestamp是时间戳Date.now() 整数单位毫秒时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
 * with_top是0或1是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
 */
export const getArticles = ({ channel_id, timestamp, with_top = 1 }) => {
  return request({
    method: 'get',
    url: `/app/v1_1/articles`,
    params: {
      channel_id,
      timestamp,
      with_top
    }
  })
}

/**
 * 不喜欢文章
 * target integer  必须  不喜欢的文章id
 */
export const dislikeArticle = article_ID => {
  return request({
    method: 'post',
    url: `/app/v1_0/article/dislikes`,
    data: {
      target: article_ID
    }
  })
}
