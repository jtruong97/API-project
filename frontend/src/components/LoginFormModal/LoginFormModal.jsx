import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { NavLink } from 'react-router-dom';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const loginDemo = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential:'Demo-lition', password:'password' }))
      .then(closeModal)
  }

  return (
    <div className='login-modal-container'>
      <h1 className='login-container'>Log In</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        <label className='login-label'>
          Username or Email
          <input
            className='login-input'
            type="text"
            value={credential}
            placeholder='Username or Email'
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className='login-label'>
          Password
          <input
            className='login-input'
            type="password"
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <button
          type="submit"
          disabled={credential.length <4 || password.length < 6}
          className='login-button'
        >Log In</button>
        {/* <button className='demo-login'>Demo User</button> */}
        <NavLink
          className='demo-login'
          onClick={loginDemo}
          to='/'
        >Demo User</NavLink>
      </form>
    </div>
  );
}

export default LoginFormModal;
