import { Navigate, Outlet } from 'umi'

export default (props:any) => {
  const isLogin = sessionStorage.getItem('token');
  console.log(isLogin,'isLogin');
  
  if (isLogin) {
    return <Outlet />;
  } else{
    return <Navigate to="/login" />;
  }
}