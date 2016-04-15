import {Page, Modal, NavController, Alert} from 'ionic-angular';
import {DAOContas} from '../../dao/dao-contas';
import {ModalContasPage} from "../modal-contas/modal-contas"
import {Toast} from "ionic-native";

@Page ({
  templateUrl: "build/pages/contas/contas.html"
})

export class ContasPage {
  static get parameters() {
    return [[NavController]]
  }


  constructor(nav) {
    this.dao = new DAOContas();
    this.dao.getList((lista) => {
      this.listContas = lista;
    });

    this.nav = nav;
  }

  insert() {
    let modal = Modal.create(ModalContasPage);

    modal.onDismiss((data) => {
      if (data) {
        this.dao.insert(data, (conta) => {
          this.listContas.push(conta);

          Toast.showShortBottom("Conta inserida com sucesso.").subscribe((toast) => {
            console.log(toast);
          });
        });
      }
    });

    this.nav.present(modal);
  }

  edit(conta) {
    let modal = Modal.create(ModalContasPage, {parametro: conta});

    modal.onDismiss((data) => {
      if (data) {
        this.dao.edit(data, (conta) => {
          Toast.showShortBottom("Conta alterada com sucesso.").subscribe((toast) => {
            console.log(toast);
          });
        });
      }
    });

    this.nav.present(modal);
  }

  delete(conta) {
    let confirm = Alert.create({
      title: "Excluir",
      body: "Gostaria de realmente excluir a conta " + conta.descricao + "?",
      buttons: [
        {
          text: "Sim",
          handler: () => {
            this.dao.delete(conta, (conta) => {
              let pos = this.listContas.indexOf(conta);
              this.listContas.splice(pos, 1);

              Toast.showShortBottom("Conta excluida com sucesso.").subscribe((toast) => {
                console.log(toast);
              });
            });
          }
        },
        {
          text: "Não"
        }
      ]
    });

    this.nav.present(confirm);
  }
}
