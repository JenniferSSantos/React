import React, {Component} from 'react';
//import Footer from '../../componentes/Footer/Footer';

class Login extends Component {
    render (){
        return (
            <section class="container flex">
      <div class="img__login"><div class="img__overlay"></div></div>

      <div class="item__login">
        <div class="row">
          <div class="item">
            <img src="./assets/img/icon-login.png" class="icone__login" alt="Logo" />
          </div>
          <div class="item" id="item__title">
            <p class="text__login" id="item__description">
              Bem-vindo! Faça login para acessar sua conta.
            </p>
          </div>
          <form>
            <div class="item">
              <input
                class="input__login"
                placeholder="username"
                type="text"
                name="username"
                id="login__email"
              />
            </div>
            <div class="item">
              <input
                class="input__login"
                placeholder="password"
                type="password"
                name="password"
                id="login__password"
              />
            </div>
            <div class="item">
              <button class="btn btn__login" id="btn__login">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
        );
    }
}

export default Login;