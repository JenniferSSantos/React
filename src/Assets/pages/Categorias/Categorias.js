import React, { Component } from 'react';
import Footer from '../../componentes/Footer/Footer';
//import da biblioteca Material Design Bootstrap React
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';

class Categorias extends Component {
    //usado para criar nossos states
    constructor() {
        //usado para poder manipular os states, que são herdados de componet
        super();
        this.state = {
            //definimos uma lista incial vazia
            lista: [],
            //pegar input do form de cadastro
            nome: "",
            //biblioteca (MDB)
            modal: false,
            //usamos para armZENAR OS dados a serem alterados
            editarModal: {
                categoriaId: "",
                titulo: ""
            },

            //criando um estado para verificar carregamento
            loading: false,

            erroMsg : ""

        }
        //damos o bind quando não usamos arrow function
        this.cadastrarCategoria = this.cadastrarCategoria.bind(this);
        //this.cadastrarCategoria = this.deletarCategoria.bind(this);
    }
    //
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }   

    UNSAFE_componentWillMount() {
        document.title = this.props.titulo_pagina;
        console.log("Carregando");
        console.log(this.state.lista);
    }

    componentDidMount() {
        console.log("Carregado");
        console.log(this.state.lista)
        this.listaAtualizada();
    }

    componentWillUnmount() {
        console.log("Saindo");
    }
    //GET - listar
    listaAtualizada = () => {

        this.setState({ loading: true });

        fetch("http://localhost:5000/api/categoria")
            .then(response => response.json())
            .then(data => this.setState({ lista: data }))
        //desabilita o icone de carregamento apos 2 segundos
        setTimeout(() => {
            this.setState({ loading: false });
        }, 2000);
    }
    //POST - cadastrar
    cadastrarCategoria(event) {
        //inpede que a pagina sej recarregada
        event.preventDefault();
        console.log("Cadastrando");
        console.log(this.state.nome);

        fetch("http://localhost:5000/api/categoria", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ titulo: this.state.nome })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.listaAtualizada();
                //this.setState(() => ({ lista: this.setState }))
            })
            .catch(error => console.log(error))
    }
    //acionado quando clicamos no botão editar para  capturar 
    //e salvar no state os dados atuais
    alterarCategoria = (categoria) => {
        console.log(categoria);

        this.setState({
            editarModal: {
                categoriaId: categoria.categoriaId,
                titulo: categoria.titulo
            }
        })

        //abrir modal
        this.toggle();
    }
    //DELETE - deletar categoria
    deletarCategoria = (id) => {
        console.log("Excluindo");

        this.setState({ erroMsg: "" })

        fetch("http://localhost:5000/api/categoria/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },

        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.listaAtualizada();
                //this.setState(() => ({ lista: this.setState }))
            })
            .catch(error => {
                console.log(error);
                this.setState({ erroMsg: "Não é possível excluir esta categoria, verifique se não há eventos que a utilizem" })
            })



    }
    //UPDATE - atualiza a categoria
    salvarAlteracoes = (event) => {
        //previne que a pagina seja recarregada
        //nao deixa recarregar a pagina
        event.preventDefault();
        fetch("http://localhost:5000/api/categoria/" + this.state.editarModal.categoriaId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.editarModal)
        })
            .then(response => response.json())
            .catch(error => console.log(error))

        //atraso na requisição, pois as requets possuem intervalos muito proximos
        setTimeout(() => {
            this.listaAtualizada();
        }, 1000);
        //fechar modal
        this.toggle();

    }

    //utilizamos para pode alterar o
    atualizaNome(input) {
        this.setState({ nome: input.target.value })
        this.setState({
            editarModal: {
                categoriaId: this.state.editarModal.categoriaId,
                titulo: input.target.value
            }

        })


    }
    //UTILIZAMOS para atualizar os states dos inpus
    atualizaEditarModalTitulo(input) {
        this.setState({
            editarModal: {
                categoriaId: this.state
                    .editarModal.categoriaId, titulo: input.target.value
            }
        })
    }

    render() {
        let instituicao = "SENAI";
        return (
            <div>
                <main className="conteudoPrincipal">
                    <section className="conteudoPrincipal-cadastro">
                        <h1 className="conteudoPrincipal-cadastro-titulo">Categorias</h1>
                        <div className="container" id="conteudoPrincipal-lista">
                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Título</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>

                                <tbody id="tabela-lista-corpo">
                                    {
                                        // Percorrer a lista de Categorias
                                        this.state.lista.map(function (Categoria) {
                                            return (

                                                // Colocamos uma "Key" pois cada linha em JSX precisa de um ID unico
                                                <tr key={Categoria.categoriaId}>
                                                    <td>{Categoria.categoriaId}</td>
                                                    <td>{Categoria.titulo}</td>
                                                    <td>
                                                        <button onClick={e => this.alterarCategoria(Categoria)}>Alterar</button>
                                                        <button onClick={e => this.deletarCategoria(Categoria.categoriaId)}>Excluir</button>
                                                    </td>
                                                </tr>
                                            )
                                            // usamos para vincular todo o contexto do map
                                        }.bind(this))
                                    }

                                </tbody>
                            </table>

                            {/* verifica e caso haja uma mensagem de erro ele mostra abaixo da tabela */}
                            {this.state.erroMsg && <div className='text-danger'> {this.state.erroMsg} </div>}

                            {/* Verifica se o estado de loading esta como true e mostra o icone de carregando */}
                            {this.state.loading && <i className='fas fa-spinner fa-spin fa-2x blue-text'></i>}

                        </div>

                        <div className="container" id="conteudoPrincipal-cadastro">
                            <h2 className="conteudoPrincipal-cadastro-titulo">
                                Cadastrar Tipo de Evento
                            </h2>
                            <form onSubmit={this.cadastrarCategoria}>
                                <div className="container">
                                    <input
                                        type="text"
                                        id="nome-tipo-evento"
                                        placeholder="tipo do evento" value={this.state.nome}
                                        onChange={this.atualizaNome.bind(this)}
                                    />
                                    <button
                                        className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                                    >
                                        Cadastrar
                                    </button>
                                </div>
                            </form>
                            {/* utilizamos o Modal da Biblioteca para fazer o UPDATE */}
                            <MDBContainer>
                                {/* Abraçamos os inputs do container com um form */}
                                <form onSubmit={this.salvarAlteracoes}>
                                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                                        <MDBModalHeader toggle={this.toggle}>Editar - Design{this.state.editarModal.titulo}</MDBModalHeader>
                                        <MDBModalBody>

                                            <MDBInput
                                                label="Categoria"
                                                value={this.state.editarModal.titulo}
                                                onChange={this.atualizaEditarModalTitulo.bind(this)}
                                            />

                                        </MDBModalBody>
                                        <MDBModalFooter>
                                            <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                                            {/* Incluimos o tipo Submit no botao para enviar o formulario */}
                                            <MDBBtn color="primary" type="submit">Save changes</MDBBtn>
                                        </MDBModalFooter>
                                    </MDBModal>
                                </form>
                            </MDBContainer>
                        </div>
                    </section>
                </main>

                <Footer escola={instituicao} />
            </div>
        );
    }
}

export default Categorias;