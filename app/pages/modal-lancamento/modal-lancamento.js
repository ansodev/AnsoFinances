import {Page, NavController, ViewController, NavParams} from 'ionic-angular';
import {DAOContas} from '../../dao/dao-contas';
import {DataUtil} from '../../util/data-util';

@Page({
  templateUrl: 'build/pages/modal-lancamento/modal-lancamento.html',
})
export class ModalLancamentoPage {
  static get parameters() {
    return [[NavController], [ViewController], [NavParams]];
  }

  constructor(nav, view, params) {
    this.nav = nav;
    this.view = view;
    this.lancamento = params.get("parametro") || {};

    this.descricao = this.lancamento.descricao;
    this.valor = this.lancamento.valor;
    this.data = this._getDate(this.lancamento.data);

    this.conta = this.lancamento.conta;
    this.entradaSaida = this.lancamento.entradaSaida;
    this.pago = this.lancamento.pago;

    this.dao = new DAOContas();

    this.dao.getList((lista) => {
      this.contas = lista;
    });
  }

  _getDate(data) {
    let dataUtil = new DataUtil();
    return dataUtil.formatDate(data);
  }

  cancel() {
    this.view.dismiss();
  }

  save() {
    let dataUtil = new DataUtil;
    let data = dataUtil.parseData(this.data);

    this.lancamento.descricao = this.descricao;
    this.lancamento.valor = parseFloat(this.valor);
    this.lancamento.data = data.getTime();
    this.lancamento.pago = this.pago ? 1 : 0;
    this.lancamento.conta = this.conta;
    this.lancamento.entradaSaida = this.entradaSaida;

    this.view.dismiss(this.lancamento);
  }
}
