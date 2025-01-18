import PageNotFound from "../Pages/PageNotFound";

const ProtectedRoutes = ({children,adminOnly = false})=>{
   const token = localStorage.getItem("token");
   const userRole = localStorage.getItem('role');
   if(!token){
    return <Navigate to="/login"/>
   }
   if (adminOnly && userRole !== "admin") {
    return <PageNotFound />
  }
  return children
}

export default ProtectedRoutes