const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  roles: state => state.user.roles,
  id: state => state.user.id,
  date: state => state.user.date,
  permission_routes: state => state.permission.routes
}
export default getters
