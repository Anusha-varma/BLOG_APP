import React from "react";
import { Link } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import { resetState } from "../redux/slices/userAuthorSlice";

function NavigationBar(){

    let {loginUserStatus,errorOccurred,errMsg,currentUser}=useSelector(state=>state.userAuthorLoginReducer)
    
    let dispatch=useDispatch()
    
    function signOut(){
        //remove token from local storage
        localStorage.removeItem('token')
        dispatch(resetState())
    }
   
   
   
    return(
    <div className="bg-info p-2" style={{minHeight:'5vh'}}>
        <div className="" style={{display:'flex', justifyContent:'space-between'}}>
        <div className="m-1"><img src="data:image/jpeg;base64,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" width="55" height="55" alt=""></img>
    </div>
    <ul className="nav justify-content-end p-2">
     {loginUserStatus===false?
     <>
        <li className="nav-item" >
            {/*link to home*/}
            <Link className="nav-link text-white" style={{fontSize:22,fontWeight:'bold'}} to=''>
                Home
            </Link>
        </li>
         {/*link to Register*/}
        <li className="nav-item text-white" >
            <Link className="nav-link display-5 text-white" style={{fontSize:22,fontWeight:'bold'}} to="register" >
                Register
            </Link>
        </li>
        {/*link to Login*/}
        <li className="nav-item" >
            <Link className="nav-link display-5 text-white" style={{fontSize:22,fontWeight:'bold'}} to="login" >
                Login
            </Link>
        </li></>:<li className="nav-item" >
            <Link className="nav-link display-5 text-white" style={{display:"flex",justifyContent:'end',gap:20, fontSize:22,fontWeight:'bold'}} onClick={signOut} to="signout" >
                <p className=" display-4 fs-3"><i>Welcome {currentUser.username},</i></p>
                Signout
            </Link>
        </li>}
        {/*link to signout*/}
        
    </ul></div></div>
 )
}

export default NavigationBar;