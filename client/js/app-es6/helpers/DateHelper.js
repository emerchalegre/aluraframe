export class DateHelper {

    constructor() {
        throw new Error('Classe não pode ser instanciada')
    }

    static textoParaData(texto) {
        if (!/\d{2}\/\d{2}\/\d{4}/.test(texto))
            throw new Error('Formato da data deve ser dd/mm/aaaa')
        return new Date(...texto.split('/').reverse().map((item, idx) => item - idx % 2))
    }

    static dataParaTexto(data) {
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`
    }

}