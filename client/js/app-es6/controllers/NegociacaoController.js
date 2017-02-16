import { Mensagem } from '../models/Mensagem';
import { Negociacao } from '../models/Negociacao';
import { ListaNegociacoes } from '../models/ListaNegociacoes';
import { NegociacoesView } from '../views/NegociacoesView';
import { MensagemView } from '../views/MensagemView';
import { NegociacaoService } from '../services/NegociacaoService';
import { DateHelper } from '../helpers/DateHelper';
import { Bind } from '../helpers/Bind';


class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document)

        this._inputData = $("#data")
        this._inputQuantidade = $("#quantidade")
        this._inputValor = $("#valor")

        this._ordemAtual = ''

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem'
        )

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($("#mensagemView")),
            'texto'
        )

        this._negociacaoService = new NegociacaoService()

        this._init()

    }

    _init() {

        this._negociacaoService
            .lista()
            .then(negociacoes => negociacoes.forEach(dado => this._listaNegociacoes.adiciona(
                new Negociacao(dado._data, dado._quantidade, dado._valor)
            )))
            .catch(erro => this._mensagem.texto = erro)
        this.importaNegociacoes()
        setInterval(() => {
            this.importaNegociacoes()
        }, 5000)
    }

    ordena(coluna) {
        if (this._ordemAtual == coluna) return this._listaNegociacoes.inverteOrdem()
        this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna])
        this._ordemAtual = coluna
    }

    importaNegociacoes() {

        this._negociacaoService
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes =>
                negociacoes.forEach(negociacao => {
                    this._listaNegociacoes.adiciona(negociacao);
                    this._mensagem.texto = 'Negociações do período importadas'
                }))
            .catch(erro => this._mensagem.texto = erro)
    }

    apaga() {

        this._negociacaoService
            .apaga()
            .then(mensagem => {
                this._listaNegociacoes.esvazia()
                this._mensagem.texto = mensagem
            })
            .catch(erro => this._mensagem.texto = erro)

    }

    adiciona(event) {
        event.preventDefault()

        let negociacao = this._criaNegociacao()

        this._negociacaoService
            .cadastra(negociacao)
            .then(mensagem => {
                console.log(mensagem)
                this._listaNegociacoes.adiciona(negociacao)
                this._mensagem.texto = 'Cadastro efetuado com sucesso'
                this._limpaFormulario()
            })
            .catch(erro => this._mensagem.texto = erro)

    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        )
    }

    _limpaFormulario() {
        this._inputData.value = ''
        this._inputQuantidade.value = 1
        this._inputValor.value = 0.0
        this._inputData.focus()
    }
}

let negociacaoController = new NegociacaoController()

export function currentInstance() {
    return negociacaoController
}