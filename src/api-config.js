let api = {
  getActivityList: '/Pc/getActivityList.json', //获取讲座列表
  getActivityListByUser: '/Pc/getActivityListByUser.json', //获取用户讲座列表
  getActivityDetail: '/getActivityDetail', //获取讲座信息
  // getManageActivityDetail: '/getManageActivityDetail', //管理员获取讲座信息和签到情况
  // isRegisteredFace: '/isRegisteredFace', //是否人脸注册
  // getUserInfo: '/getUserInfo', //获取用户信息 是否研究生
  // blacklist: '/blacklist', //黑名单
  pageInit: '/pageInit', //合并接口
  coolDown: '/coolDown', //冷却CD
  getTicketByActivity: '/getTicketByActivity', //获取票据
  getUserTicketByDate: '/getUserTicketByDate', //获取某月票据
  // isAdmin: '/isAdmin', //是否管理员
  getMyQrcode: '/getMyQrcode', //二维码
  robTickets: '/robTickets', //讲座报名
  uRefundTicket: '/uRefundTicket', //取消报名
  queueTicket: '/Swoole/push.json', //报名队列
  pollTicket: '/Swoole/result.json', //轮询结果
};
export default api