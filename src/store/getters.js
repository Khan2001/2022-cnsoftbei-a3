const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  newUsers: state => state.user.newUsers,
  totalUsers: state => state.user.totalUsers,
  newArticles: state => state.user.newArticles,
  totalArticles: state => state.user.totalArticles,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  id: state => state.user.id,
  date: state => state.user.date,
  permission_routes: state => state.permission.routes
}
export default getters
