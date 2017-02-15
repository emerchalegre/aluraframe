"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Negociacao = function () {
    function Negociacao(data, valor, quantidade) {
        _classCallCheck(this, Negociacao);

        this._data = new Date(data.getTime());
        this._valor = valor;
        this._quantidade = quantidade;
        Object.freeze(this);
    }

    _createClass(Negociacao, [{
        key: "isEquals",
        value: function isEquals(outraNegociacao) {
            return JSON.stringify(this) == JSON.stringify(outraNegociacao);
        }
    }, {
        key: "volume",
        get: function get() {
            return this._valor * this._quantidade;
        }
    }, {
        key: "data",
        get: function get() {
            return new Date(this._data.getTime());
        }
    }, {
        key: "valor",
        get: function get() {
            return this._valor;
        }
    }, {
        key: "quantidade",
        get: function get() {
            return this._quantidade;
        }
    }]);

    return Negociacao;
}();
//# sourceMappingURL=Negociacao.js.map