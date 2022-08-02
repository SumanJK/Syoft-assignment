
import {Navigate, Route, Routes} from "react-router";
import Register from './Register';
import Login from './Login';
import Products from './Products';


function AllRoutes() {
  return (
   <Routes>
    <Route path="/" element={<Navigate to="/register"/>} />
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/products' element={<Products/>}/>
   </Routes>
  );
}

export default AllRoutes;