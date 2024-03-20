
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { SignInUser } from "../Services/user";
import { toast } from 'react-toastify';

export function Login() { 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const onSignin = async () => {
        if (email.length == 0){
            toast.warn("Enter Email")
        }
        else if (password.length == 0){
            toast.warn("Enter Password")
        }
        else {
            // Make the API call
            const result = await SignInUser(email, password);
            if (result['status'] == 'success') {
                const jwt = result['data']['jwt']
                sessionStorage['token'] = jwt
                toast.success('Welcome to the mukai nagar')
                navigate('/home')
            }
            else{
                toast.error(result['error'])
            }
        }
    }

      return (
    <>
      <h1 className='title'>Signin</h1>

      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='form'>
            <div className='mb-3'>
              <label htmlFor=''>Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                placeholder='abc@test.com'
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='xxxxxxxx'
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <div>
                Don't have an account? <Link to='/student_signup'>Signup here</Link>
              </div>
              <button onClick={onSignin} className='btn btn-primary mt-2'>
                Signin
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </>
  )
}


export default Login