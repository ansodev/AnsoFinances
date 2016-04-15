import {Storage, SqlStorage} from 'ionic-angular';

export class DAOContas {
  constructor() {
    let storage = new Storage(SqlStorage);

    storage.query("CREATE TABLE IF NOT EXISTS contas(id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT)").then((data) => {
      console.log("Tabela criada");
    }, (error) => {
      console.log("Erro na criação da tabela " + JSON.stringify(error.err));
    });
  }

  getList(successCallback) {
    let storage = new Storage(SqlStorage);

    storage.query("SELECT * FROM contas").then((data) => {
      let lista = [];

      for (var i = 0; i < data.res.rows.length; i++) {
        let item = {};

        item.id = data.res.rows.item(i).id;
        item.descricao = data.res.rows.item(i).descricao;

        lista.push(item);

      }
      successCallback(lista);

    }, (error) => {
      console.log("Erro na criação da tabela " + JSON.stringify(error.err));
    })
  }

  insert(conta, successCallback) {
    let storage = new Storage(SqlStorage);

    storage.query("INSERT INTO contas(descricao) VALUES(?)", [conta.descricao]).then((data) => {
      conta.id = data.res.insertId;
      successCallback(conta);
      console.log("Gravou");
    }, (error) => {
      console.log("Erro na criação da tabela " + JSON.stringify(error.err));
    });
  }

  edit(conta, successCallback) {
    let storage = new Storage(SqlStorage);

    storage.query("UPDATE contas SET descricao = ? where id = ?", [conta.descricao, conta.id]).then((data) => {
      successCallback(conta);
    }, (error) => {
      console.log("Erro na criação da tabela " + JSON.stringify(error.err));
    });
  }

  delete(conta, successCallback) {
    let storage = new Storage(SqlStorage);

    storage.query("DELETE FROM contas WHERE id = ?", [conta.id]).then((data) => {
      successCallback(conta);
    }, (error) => {
      console.log("Erro na criação da tabela " + JSON.stringify(error.err));
    });
  }
}
