"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        _classCallCheck(this, NegociacaoController);

        var $ = document.querySelector.bind(document);

        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        this._ordemAtual = '';

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagemView")), 'texto');

        this._negociacaoService = new NegociacaoService();

        this._init();
    }

    _createClass(NegociacaoController, [{
        key: "_init",
        value: function _init() {
            var _this = this;

            this._negociacaoService.lista().then(function (negociacoes) {
                return negociacoes.forEach(function (dado) {
                    return _this._listaNegociacoes.adiciona(new Negociacao(dado._data, dado._quantidade, dado._valor));
                });
            }).catch(function (erro) {
                return _this._mensagem.texto = erro;
            });
            this.importaNegociacoes();
            setInterval(function () {
                _this.importaNegociacoes();
            }, 5000);
        }
    }, {
        key: "ordena",
        value: function ordena(coluna) {
            if (this._ordemAtual == coluna) return this._listaNegociacoes.inverteOrdem();
            this._listaNegociacoes.ordena(function (a, b) {
                return a[coluna] - b[coluna];
            });
            this._ordemAtual = coluna;
        }
    }, {
        key: "importaNegociacoes",
        value: function importaNegociacoes() {
            var _this2 = this;

            this._negociacaoService.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    _this2._listaNegociacoes.adiciona(negociacao);
                    _this2._mensagem.texto = 'Negociações do período importadas';
                });
            }).catch(function (erro) {
                return _this2._mensagem.texto = erro;
            });
        }
    }, {
        key: "apaga",
        value: function apaga() {
            var _this3 = this;

            this._negociacaoService.apaga().then(function (mensagem) {
                _this3._listaNegociacoes.esvazia();
                _this3._mensagem.texto = mensagem;
            }).catch(function (erro) {
                return _this3._mensagem.texto = erro;
            });
        }
    }, {
        key: "adiciona",
        value: function adiciona(event) {
            var _this4 = this;

            event.preventDefault();

            var negociacao = this._criaNegociacao();

            this._negociacaoService.cadastra(negociacao).then(function (mensagem) {
                console.log(mensagem);
                _this4._listaNegociacoes.adiciona(negociacao);
                _this4._mensagem.texto = 'Cadastro efetuado com sucesso';
                _this4._limpaFormulario();
            }).catch(function (erro) {
                return _this4._mensagem.texto = erro;
            });
        }
    }, {
        key: "_criaNegociacao",
        value: function _criaNegociacao() {
            return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        }
    }, {
        key: "_limpaFormulario",
        value: function _limpaFormulario() {
            this._inputData.value = '';
            this._inputQuantidade.value = 1;
            this._inputValor.value = 0.0;
            this._inputData.focus();
        }
    }]);

    return NegociacaoController;
}();
//# sourceMappingURL=NegociacaoController.js.map