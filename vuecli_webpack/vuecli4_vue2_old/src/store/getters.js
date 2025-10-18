// 这是把所有模块中的 getter 集中在此
const getters = {
  // sidebar: state => state.app.sidebar,
  // size: state => state.app.size,
  // device: state => state.app.device,
  // visitedViews: state => state.tagsView.visitedViews,
  // cachedViews: state => state.tagsView.cachedViews,
  // token: state => state.user.token,
  // avatar: state => state.user.avatar,
  // name: state => state.user.name,
  // introduction: state => state.user.introduction,
  // roles: state => state.user.roles,
  // errorLogs: state => state.errorLog.logs




  // logoTxtColor: (state, getters) => getters['app/sidebarLogoTxtColor']

  logoTxtColor: state => state.app.sidebarLogoTxtColor_2,

  permission_routes: state => state.permission.routes,
}
export default getters
