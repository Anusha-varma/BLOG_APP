import { useState } from 'react';
import axios from 'axios'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
const divStyle={
  backgroundColor:'rgba(225,225,225,0.4)',
   width:'600px',
   height:'600px',
    
};
function Register(){

   let {register,handleSubmit, formState:{errors}}=useForm()
   let [err,setErr]=useState('')
   let navigate=useNavigate()

  //handle form submit
 async function handleFormSubmit(userObj){
   //make http post request
   let res=await axios.post('http://localhost:4000/user-api/user',userObj)
   console.log(res)
   if(res.data.message==='User created'){
    //navigate to login
    navigate('/login')
   }else{
    setErr(res.data.message)
   }
  }

    return(
  <div className='d-flex justify-content-center align-items-center vh-50 bg-success'>
    <div className='card p-5 m-5' style={divStyle}>
    <h1 className="display-4 text-center text-dark mb-4"><i>Register</i></h1>
       
       {/* dispaly user login error message*/}
       {err.length!==0&&<p className='text-danger fs-3 text-center'>{err}</p>}

    <form className="w-50 mx-auto" onSubmit={handleSubmit(handleFormSubmit)}>
      
    <div style={{display:'flex', justifyContent:'center', gap:20}}>
     <p className='text-white' style={{fontSize:'20px'}}><i>Register as</i></p>
     
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
          <label htmlFor="email" className="form-label" style={{fontWeight:'bold'}}>Email</label>
          <input type="email" id="email" className="form-control" {...register('email',{required:true})}></input>
          {errors.email?.type==='required' && <p className='text-danger'>Email is required</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label" style={{fontWeight:'bold'}}>Create Password</label>
          <input type="password" id="password" className="form-control" {...register('password',{required:true})}></input>
          {errors.password?.type==='required' && <p className='text-danger'>Password is required</p>}
        </div>
        <div className='text-center'>
        <button className="btn btn-info mt-3 text-white" style={{fontWeight:'bold'}}>Sign up</button></div>
    </form>
    </div>
  </div>
    )
}
export default Register;