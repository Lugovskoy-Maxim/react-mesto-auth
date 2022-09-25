import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {

  const [userLogin, setUserLogin] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLogin({
      [name]: value,
    });
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onRegister(userLogin.email, userLogin.password);
    setUserLogin({ email: "", password: "" })
  }

  return (
    <div className="login">
      <h2 className="login__welcome">Регистрация</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          className="login__input"
          placeholder="Email"
          onChange={handleChange}
          value={userLogin.email || ''}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          className="login__input"
          placeholder="Пароль"
          onChange={handleChange}
          value={userLogin.password || ''}
          required
        />
        <button type="submit" className="login__save-button">Зарегистрироваться</button>
        <p className="login__text">Уже зарегистрированы?
        {/* <Link className="login__link link" to="/sign-in">Войти</Link> */}
        </p>
      </form>
    </div>
  )
}

export default Register;