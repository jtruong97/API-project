import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div className='signup-modal-container'>
      <h1 className='signup-header'>Sign Up</h1>
      <form className ='signup-form'onSubmit={handleSubmit}>
        <label className='signup-label'>
          Email
          <input
            className='signup-input'
            type="text"
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className='validation-checks'>{errors.email}</p>}
        <label className='signup-label'>
          Username
          <input
            className='signup-input'
            type="text"
            value={username}
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className='validation-checks'>{errors.username}</p>}
        <label className='signup-label'>
          First Name
          <input
            className='signup-input'
            type="text"
            value={firstName}
            placeholder='First Name'
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p className='validation-checks'>{errors.firstName}</p>}
        <label className='signup-label'>
          Last Name
          <input
            className='signup-input'
            type="text"
            value={lastName}
            placeholder='Last Name'
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p className='validation-checks'>{errors.lastName}</p>}
        <label className='signup-label'>
          Password
          <input
            className='signup-input'
            type="password"
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className='validation-checks'>{errors.password}</p>}
        <label className='signup-label'>
          Confirm Password
          <input
            className='signup-input'
            type="password"
            value={confirmPassword}
            placeholder='Confirm Password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p className='validation-checks'>{errors.confirmPassword}</p>}
        <button
          type="submit"
          className='signup-button'
          disabled={username.length < 4 || password.length < 6 || !firstName || !lastName || !email || !confirmPassword}
        >Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
