import {Page} from 'ionic-angular';
import {LancamentosPage} from '../lancamentos/lancamentos';
import {SaldoPage} from '../saldo/saldo';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor() {
    this.saldo = SaldoPage;
    this.lancamentos = LancamentosPage;
  }

}
