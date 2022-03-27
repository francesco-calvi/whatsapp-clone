import React from 'react'
import './Login.css'
import { actionTypes } from '../state/reducer'
import {auth, provider} from '../firebase'
import {useStateValue} from '../state/StateProvider'

function Login() {
  const [{}, dispatch] = useStateValue();
  

  const signIn = () => {
    auth.signInWithPopup(provider)
    .then((result) => {
      dispatch({
        type: actionTypes.SET_USER,
        user: result.user
      })
    })
    .catch((error) => console.error(error.message))
  }
  return (
    <div className='login'>
      <div className='login__container'>
        <img src="" alt="" />
        <div className='login__text'>
          <h1>Sign in to WhatsApp</h1>
        </div>

      </div>
      <button onClick={signIn}>Login</button>

    </div>
  )
}

export default Login