const stores = ['negociacoes']
const version = 7
const dbName = 'aluraframe'

let connection = null
let close = null

export class ConnectionFactory {

    constructor() {
        throw new Error("Connection Factory não pode ser instaciada")
    }

    static getConnection() {

        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open(dbName, version)

            openRequest.onupgradeneeded = e => {
                console.log('interceptando o upgrade')
                this._createStore(e.target.result)
            }

            openRequest.onsuccess = e => {
                if (!connection) {
                    connection = e.target.result
                    close = connection.close.bind(connection)
                    connection.close = function() {
                        throw new Error('Conexão só pode ser fechada pelo método closeConnection')
                    }
                }
                resolve(connection)
            }

            openRequest.onerror = e => {

                reject(e.target.error)
            }
        })
    }

    static _createStore(connection) {

        stores.forEach(store => {
            if (connection.objectStoreNames.contains(store)) return connection.deleteObjectStore(store)
            connection.createObjectStore(store, { autoIncrement: true })
        })
    }

    static closeConnection() {
        if (connection) {
            close()
            connection = null
            console.log("Conexão fechada com sucesso")
        }
    }
}