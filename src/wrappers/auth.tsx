import { Navigate, Outlet } from 'umi'

export default (props:any) => {
  const isLogin = localStorage.getItem("dmbkgdsys-user");
  // console.log(isLogin,'isLogin');
  
  if (isLogin) {
    return <Outlet />;
  } else{
    return <Navigate to="/login" />;
  }
}