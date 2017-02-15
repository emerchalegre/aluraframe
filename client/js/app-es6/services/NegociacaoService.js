class NegociacaoService {

    constructor() {
        this._http = new HttpService()
    }

    obterNegociacoes() {
        return Promise.all([
            this.obterNegociacoesSemana(),
            this.obterNegociacoesSemanaAnterior(),
            this.obterNegociacoesRetrasada()
        ]).then(periodos => {
            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), [])
            return negociacoes
        }).catch(erro => {
            throw new Error(erro)
        });
    }

    obterNegociacoesSemana() {
        return this._http
            .get('negociacoes/semana')
            .then(negociacao => {
                return negociacao.map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor))
            })
            .catch(erro => {
                console.log(erro)
                throw new Error("Não foi possível obter as negociações da semana")
            })
    }

    obterNegociacoesSemanaAnterior() {
        return this._http
            .get('negociacoes/anterior')
            .then(negociacao => {
                return negociacao.map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor))
            })
            .catch(erro => {
                console.log(erro)
                throw new Error("Não foi possível obter as negociações da semana anterior")
            })
    }

    obterNegociacoesRetrasada() {
        return this._http
            .get('negociacoes/retrasada')
            .then(negociacoes => {

                console.log(negociacoes);

                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana retrasada');
            });
    }

    cadastra(negociacao) {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => "Negociação adicionada com sucesso")
            .catch(erro => {
                throw new Error("Não foi possível adicionar a negociação!")
            })
    }

    lista() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listarTodos())
            .catch(erro => {
                console.log(erro)
                throw new Error("Não foi possível obter as Negociações")
            })
    }

    apaga() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(mensagem => "Dados apagados com sucesso")
            .catch(erro => {
                console.log(erro)
                throw new Error("Não foi possível obter as Negociações")
            })
    }

    importa(listaAtual) {
        return this.obterNegociacoes()
            .then(negociacoes =>
                negociacoes.filter(negociacao =>
                    !listaAtual.some(negociacaoExistente =>
                        negociacao.isEquals(negociacaoExistente)
                    )
                )
            )
            .catch(erro => {
                console.log(erro)
                throw new Error("Não foi possível importar as negociações")
            })
    }
}