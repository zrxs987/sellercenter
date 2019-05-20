const getters = {
 // avatar: state => state.user.avatar,
// name: state => state.user.sellerName,
  sidebar: state => state.app.sidebar,//侧边栏
  device: state => state.app.device,
  token: state => state.user.token,
  sellerId: state=> state.user.sellerId,
  sellerName: state=> state.user.sellerName,
  memberId: state=> state.user.memberId,
  storeId: state=> state.user.storeId,
}
export default getters
