import React from 'react';
import { Link } from 'react-router-dom';

const Register = props => {
  const [state, setState] = React.useState({
    email: '',
    password: ''
  });
  
  const handleChange = e =>{
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
    props.onRegister(email, password)
  }

  return (
    <div className="sign-up">
      <h2 className='sign-up__title'>Регистрация</h2>
      <form onSubmit={handleSubmit} className='sign-up__form'>
        <input id="email" name="email" onChange={handleChange} value={state.email} className="sign-up__input sign-up__input_type_email" type="email" placeholder="Email" required />
        <input id="password" name="password" onChange={handleChange} value={state.password} className="sign-up__input sign-up__input_type_password" type="password" placeholder="Пароль" required />
        <button type="submit" className='sign-up__submit'>Зарегистрироваться</button>
      </form>
      <Link exact to="/sign-in" className="sign-up__to-login">Уже зарегистрированы? Войти</Link>
    </div>
  );
};

export default Register;