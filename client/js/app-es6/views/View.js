export class View {
    constructor(elemento) {
        this._elemento = elemento
    }

    template() {
        throw new Error('O método template não foi implementado na View')
    }

    update(model) {
        this._elemento.innerHTML = this.template(model)
    }
}