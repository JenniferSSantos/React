import React, { Component } from 'react';
//import Footer from '../../componentes/Footer/Footer';
import Footer from '../../componentes/Footer/Footer';
//import da biblioteca Material Design Bootstrap React
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalFooter, MDBInput} from 'mdbreact';

class Eventos extends Component {

    //usado para criar nossos states
    constructor(){
        //usado para poder manipular os states, que são herdados de componet
        super();
        this.state = {
            //definimos uma lista inicial vazia
            lista : [],
            //pegar input do form de cadastro
            nome: "",
            //biblioteca (MDB)
            modal: false,
            //usamos para armazenar os dados a serem alterados
            editalModal: {
                evento: "",
                titulo: ""
            },

            //criando um estado para verificar carregamento
            loading: false,

            erroMsg : ""
        }
        //damos o bind quando não usamos arrow function
        this.cadastrarEvento = this.cadastrarEvento.bind(this);
    }
    //
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    UNSAFE_componentWillMount() {
        //document.title = this.props
        console.log("Carregando");
        console.log(this.state.lista);
    }
    render() {
        return (
            <section class="conteudoPrincipal-cadastro">
                <h1 class="conteudoPrincipal-cadastro-titulo">Eventos</h1>
                <div class="container" id="conteudoPrincipal-lista">
                    <table id="tabela-lista">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Evento</th>
                                <th>Data</th>
                                <th>Acesso Livre</th>
                                <th>Tipo do Evento</th>
                            </tr>
                        </thead>

                        <tbody id="tabela-lista-corpo">

                        {
                             //Percorrer a lista de Categorias
                             this.state.lista.map(function (Categorias) {
                                return (

                                    //Colocamos uma "Key" pois cada linha em JSX precisa de um ID unico
                                    <tr key={Eventos.Eventos}>
                                        <td>{Eventos.Eventos}</td>
                                        <td>{Eventos.Eventos}</td>
                                        <td>
                                            <button onClick={e => this.alterarEventos(Eventos)}>Alterar</button>
                                            <button onClick={e => this.alterarEventos(Eventos)}>Excluir</button>

                                        </td>
                                    </tr>
                                )
                                //usamos para vincular todo o contexto do map
                             }.bind(this))
                        }

                        </tbody>
                    </table>
                    {/* verificar e caso haja uma mensagem de erro ele mostra abaixo da tabela*/}
                    {this.state.erroMsg && <div className='text-danger'> {this.state.erroMsg} </div>}

                    {/* verificar se o estado de loading esta como true e mostra o icone de carregamento*/}
                </div>

                <div class="container" id="conteudoPrincipal-cadastro">
                    <h2 class="conteudoPrincipal-cadastro-titulo">Cadastrar Evento</h2>
                    <div class="container">
                        <input
                            type="text"
                            id="evento__titulo"
                            placeholder="título do evento"
                        />
                        <input type="text" id="evento__data" placeholder="dd/MM/yyyy" />
                        <select id="option__acessolivre">
                            <option value="1">Livre</option>
                            <option value="0">Restrito</option>
                        </select>
                        <select id="option__tipoevento">
                            <option value="0" disabled>Tipo do Evento</option>
                        </select>
                        <textarea
                            rows="3"
                            cols="50"
                            placeholder="descrição do evento"
                            id="evento__descricao"
                        ></textarea>
                    </div>
                    <button
                        class="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                        onclick="cadastrarEvento()"
                    >
                        Cadastrar
          </button>
                </div>
            </section>
        );
    }
}
export default Eventos;
