import { useState } from "react";
import { Link } from "react-router-dom";
import * as auth from "../Utils/auth";

function Login(props) {
  const { onLogin } = props;
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLogin({
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // здесь нужно будет добавить логин
    if (!userLogin.email || !userLogin.password) {
      return;
    }
    auth
      .authorize(userLogin.email, userLogin.password)
      .then((data) => {
        if (data.jwt) {
          setUserLogin({ email: "", password: "" }, () => {
            // handleLogin();
            // push("/cards");
          });
        }
        // нужно проверить, есть ли у данных jwt
        // сбросьте стейт, затем в колбэке установите
        // стейт loggedIn родительского App как true,
        // затем перенаправьте его в /diary
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="login">
        <p className="login__welcome">Вход</p>
        <form onSubmit={handleSubmit} className="login__form">
          <label htmlFor="email"></label>
          <input
            className="login__input"
            placeholder="Email"
            required
            id="email"
            name="email"
            type="email"
            value={userLogin.email || "" }
            onChange={handleChange}
          />
          <label htmlFor="password"></label>
          <input
            className="login__input"
            placeholder="Пароль"
            required
            id="password"
            name="password"
            type="password"
            value={userLogin.password || ""}
            onChange={handleChange}
          />
          <div className="login__button-container">
            <button type="submit" className="login__save-button">
              Войти
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
