const getters = {
 // avatar: state => state.user.avatar,
// name: state => state.user.sellerName,
  sidebar: state => state.app.sidebar,//侧边栏
  device: state => state.app.device,
  token: state => state.user.token,
  sellerId: state=> state.user.sellerId,
  sellerName: state=> state.user.sellerName
}
export default getters
