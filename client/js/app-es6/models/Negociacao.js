export class Negociacao {
    constructor(data, valor, quantidade) {
        this._data = new Date(data.getTime())
        this._valor = valor
        this._quantidade = quantidade
        Object.freeze(this)
    }

    get volume() {
        return this._valor * this._quantidade
    }

    get data() {
        return new Date(this._data.getTime())
    }

    get valor() {
        return this._valor
    }

    get quantidade() {
        return this._quantidade
    }

    isEquals(outraNegociacao) {
        return JSON.stringify(this) == JSON.stringify(outraNegociacao)
    }
}