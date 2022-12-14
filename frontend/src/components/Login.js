import React from 'react';

const initValues = {
  email: '',
  password: ''
}

const Login = props => {
  const [state, setState] = React.useState(initValues);

  const handleChange = e => {
    const {name, value} = e.target;
    setState(old => ({
      ...old,
      [name]: value
    }))
  };

  const handleSubmit = e =>{
    e.preventDefault();
    const { email, password } = state;
    if (!password || !email) return;
    props.onLogin(email, password);
  };

  return (
    <div className="sign-in">
      <h2 className='sign-in__title'>Вход</h2>
      <form onSubmit={handleSubmit} className='sign-in__form'>
        <input 
          id="email" 
          name="email" 
          onChange={handleChange} 
          value={state.email} 
          type="email" 
          className="sign-in__input sign-up__input_type_email" 
          placeholder="Email" 
          required />
        <input 
          id="password" 
          name="password" 
          onChange={handleChange} 
          value={state.password} 
          type="password" 
          className="sign-in__input sign-up__input_type_password" 
          placeholder="Пароль" 
          required />
        <button type="submit" className='sign-in__submit'>Войти</button>
      </form>
    </div>
  );
}

export default Login;