import {useForm} from 'react-hook-form'

function Form(){

   let {register,handleSubmit, formState:{errors}}=useForm()
  //handle form submit
  function handleFormSubmit(userObj){
  console.log(userObj)
  }
    return(
  <div>
    <div className='display-flex'>
        <h1>Home</h1>
        <h1>Login</h1>
    </div>
    <h1 className="display-3 text-center text-primary">Registration form</h1>
    <form className="w-50 mx-auto" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" id="username" className="form-control" {...register('username',{required:true,minLength:4,maxLength:6})}></input>
        {/*validation error message for username*/}
     {errors.username?.type==='required' && <p className='text-danger'>Username is required</p>}
     {errors.username?.type==='minLength' && <p className='text-danger'>Min 4 characters required</p>}
     {errors.username?.type==='maxLength' && <p className='text-danger'>Max length should be 6</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" id="email" className="form-control" {...register('email',{required:true})}></input>
          {errors.email?.type==='required' && <p className='text-danger'>Email is required</p>}
        </div>

        <div className='mb-3'>

        </div>
        
        <button className="btn btn-success">Login</button>
    </form>
  </div>
    )
}
export default Form;