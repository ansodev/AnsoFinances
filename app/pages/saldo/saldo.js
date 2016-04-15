import {Page, NavController, Events} from 'ionic-angular';
import {DAOLancamentos} from '../../dao/dao-lancamentos';

/*
  Generated class for the SaldoPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/saldo/saldo.html',
})
export class SaldoPage {
  static get parameters() {
    return [[NavController], [Events]];
  }

  constructor(nav, events) {
    this.nav = nav;

    this.dao = new DAOLancamentos();

    this.dao.getSaldo((saldo) => {
      this.saldo = saldo;
    });

    events.subscribe("saldo:updated", (saldo) => {
      this.saldo = parseFloat(saldo);
    });
  }
}
