// 频道api
/**
 * 获取频带列表
 */
import request from '@/utils/request.js'

export const getChannelsUserOrDefault = ({
  mobile,
  code
}) => {
  return request({
    method: 'get',
    url: `/app/v1_0/user/channels`,
    data: {
      mobile,
      code
    }
  })
}
