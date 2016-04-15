import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular/config/directives';
import {DataUtil} from '../util/data-util';

@Component({
  selector: "data-filter",
  directives: [IONIC_DIRECTIVES],
  inputs: ['startDate'],
  outputs: ['changeMonth', 'clickMonth'],
  template: `<ion-row>
    <ion-col width-10>
      <button favorite clear round (click)="previousMonth()"><ion-icon name="arrow-dropleft-circle"></ion-icon></button>
    </ion-col>

    <ion-col width-75>
      <h4 class="texto-destaque" favorite (click)="executeClickMonth()">{{mesSelecionado}}</h4>
    </ion-col>

    <ion-col width-10="">
      <button favorite clear round (click)="nextMonth()"><ion-icon name="arrow-dropright-circle"></ion-icon></button>
    </ion-col>
  </ion-row>
  `
})

export class DataFilter {
  constructor() {
    this.changeMonth = new EventEmitter();
    this.clickMonth = new EventEmitter();
  }

  _executeChangeMonth() {
    this.changeMonth.next(this.startDate);
  }

  executeClickMonth() {
    this.clickMonth.next();
  }

  _updateMonth() {
    let dataUtil = new DataUtil();
    let ano  = this.startDate.getFullYear();
    this.mesSelecionado = dataUtil.getMonthName(this.startDate) + " - " + ano;
    this._executeChangeMonth();
  }

  ngOnInit() {
    this._updateMonth();
  }

  ngOnChanges(changes) {
    this._updateMonth();
  }


  previousMonth() {
    this.startDate.setMonth(this.startDate.getMonth() - 1);
    this._updateMonth();
  }

  nextMonth() {
    this.startDate.setMonth(this.startDate.getMonth() + 1);
    this._updateMonth();
  }
}
