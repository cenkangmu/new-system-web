export default ()=>{
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.href = '/#/login'
}