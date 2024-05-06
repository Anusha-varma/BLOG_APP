import {useForm} from 'react-hook-form'
import {useDispatch,useSelector} from 'react-redux';
import { userAuthorLoginThunk } from '../redux/slices/userAuthorSlice';
import { useEffect } from 'react';
import {Navigate, useNavigate} from 'react-router-dom'
const divStyle={
  backgroundColor:'rgba(225,225,225,0.4)',
  width:'600px',
  height:'500px',
};

function Login(){
   let {register,handleSubmit, formState:{errors}}=useForm()
  let {loginUserStatus,errorOccurred,errMsg}=useSelector(state=>state.userAuthorLoginReducer)
  let navigate=useNavigate()

   let dispatch=useDispatch()
  //handle form submit
  function handleFormSubmit(userCredObj){
  console.log(userCredObj)
  dispatch(userAuthorLoginThunk(userCredObj))
  }

   useEffect(()=>{
    if(loginUserStatus===true){
    navigate('/user-profile')
    }
   },[loginUserStatus])


    return(
<div className='d-flex justify-content-center align-items-center vh-50 bg-secondary' >
    <div className='card m-5   opacity-25' style={divStyle}>
    <h1 className="display-4 text-center text-dark p-4" ><i>Login</i></h1>
  
    <form className="w-50 mx-auto" onSubmit={handleSubmit(handleFormSubmit)}>
    <div style={{display:'flex', justifyContent:'center', gap:20}}>
     <p className='text-white' style={{fontSize:'20px'}}><i>Login as</i></p>
     
     <div className='form-check form-check-inline'>
     <input type='radio' id="author" value="author" className="form-control" style={{width:'30px'}} {...register("userType",{required:true})}></input>
     <label htmlFor="author" className="form-label" style={{fontSize:'20px'}}>Author</label>
     </div>
     <div className='form-check form-check-inline'>
     <input type='radio' id="user" value='user' className="form-control" style={{width:'30px'}} {...register('userType',{required:true})}></input>
     <label htmlFor="user"  className="form-label" style={{fontSize:'20px'}}>User</label> 
     </div>  
     </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label" style={{fontWeight:'bold'}}>Username</label>
          <input type="text" id="username" className="form-control" {...register('username',{required:true,maxLength:6})}></input>
        {/*validation error message for username*/}
     {errors.username?.type==='required' && <p className='text-danger'>Username is required</p>}
     {errors.username?.type==='maxLength' && <p className='text-danger'>Max length should be 6</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label" style={{fontWeight:'bold'}}>Password</label>
          <input type="password" id="password" className="form-control" {...register('password',{required:true})}></input>
          {errors.password?.type==='required' && <p className='text-danger'>Password is required</p>}
        </div>
        <div className='text-center'>
        <button className="btn btn-warning mt-3 text-dark" style={{fontWeight:'bold'}}>Sign in</button></div>
    </form>
  </div>
  </div>
    )
}
export default Login;