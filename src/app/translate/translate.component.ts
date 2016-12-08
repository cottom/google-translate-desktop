import { Component } from '@angular/core';
import { GoogleTranslateApi } from '../core';
@Component({
  selector: 'gtd-translate',
  templateUrl: './translate.component.html',
  styles: [`
    .tranlate-textarea {height:160px; font-size: 14px;}
    .btn-container {
      text-align: right;
    }
    .slds-card {
      padding:1rem;
      font-size: 14px;
      margin-top: 2rem;
    }
  `]
})
export class TranslateComponent {
  loading: Boolean;
  tranlatedText: String;
  constructor(private translateService: GoogleTranslateApi) {}
  translateWord(text) {
    this.loading = true;
    this.translateService.translateAuto(text).then(res => {
      this.tranlatedText = res;
      this.loading = false;
    }).catch((e) => {
      this.loading = false;
      console.log(e.code);
    });
  }
 }
