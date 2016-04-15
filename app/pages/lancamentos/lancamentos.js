import {Page, NavController, Modal, Alert, Events} from 'ionic-angular';
import {ModalLancamentoPage} from '../modal-lancamento/modal-lancamento';
import {DAOLancamentos} from '../../dao/dao-lancamentos';
import {DataUtil} from '../../util/data-util';
import {DataFilter} from '../../components/data-filter';
import {RelatorioPage} from '../relatorio/relatorio';

/*
  Generated class for the LancamentosPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/lancamentos/lancamentos.html',
  directives: [DataFilter]
})
export class LancamentosPage {
  static get parameters() {
    return [[NavController], [Events]];
  }

  constructor(nav, events) {
    this.nav = nav;
    this.events = events;
    this.dao = new DAOLancamentos();
    this.listLancamentos = [];

    this.dataFiltro = new Date();

    this.getListaLancamentos();
  }

  getListaLancamentos() {
    let dataUtil = new DataUtil();
    let dataInicio = dataUtil.getFirstDay(this.dataFiltro);
    let dataFim = dataUtil.getLastDay(this.dataFiltro);

    this.dao.getList(dataInicio, dataFim, (lista) => {
      this.listLancamentos = lista;
    });
  }

  updateMonth(data) {
    this.dataFiltro = data;
    this.getListaLancamentos();
    this.updateSaldo();
  }

  insert() {
    let modal = Modal.create(ModalLancamentoPage);

    modal.onDismiss((data) => {
      if (data) {
        this.dao.insert(data, (lancamento) => {
          this.updateMonth(new Date(lancamento.data));
        })
      }
    })

    this.nav.present(modal);
  }

  delete(lancamento) {
    let confirm = Alert.create({
      title: "Excluir",
      body: "Gostaria de realmente excluir o lançamento " + lancamento.descricao + "?",
      buttons: [{
        text: "Sim",
        handler: () => {
          this.dao.delete(lancamento, (lancamento) => {
            this.updateMonth(new Date(lancamento.data));
          });
        }
      },
      {
        text: "Não"
      }]
    });

    this.nav.present(confirm);
  }

  edit(lancamento) {
    let modal = Modal.create(ModalLancamentoPage, {parametro: lancamento});

    modal.onDismiss((data) => {
      if (data) {
        this.dao.edit(lancamento, (lancamento) => {
          this.updateMonth(new Date(lancamento.data));
        });
      }
    });

    this.nav.present(modal);
  }

  getDate(lancamento) {
    let dataUtil = new DataUtil;
    return dataUtil.parseString(lancamento.data);
  }

  situacaoLancamento(lancamento) {
    return lancamento.pago ? "Pago" : "Não pago"
  }

  lancamentoEntrada(lancamento) {
    return lancamento.entradaSaida == "entrada";
  }

  updateSaldo() {
    this.dao.getSaldo((saldo) => {
      this.events.publish("saldo:updated", saldo);
    })
  }

  paymentButtonText(lancamento) {
    return lancamento.pago ? "Reabrir" : "Pagar";
  }

  changePaymentStatus(lancamento) {
    lancamento.pago = lancamento.pago ? 0 : 1;

    this.dao.edit(lancamento, (lancamento) => {
      this.updateMonth(new Date(lancamento.data));
    })
  }

  onClickMonth() {
    this.nav.push(RelatorioPage, {parametro: this.dataFiltro});
  }
}
