import { Injectable } from '@angular/core';
const translate = require('google-translate-api-plus')('cn');
@Injectable()
export class GoogleTranslateApi {
  private _toENOption: Object;
  private _toCNOption: Object;
  constructor() {
    this._toENOption = {to: 'en'};
    this._toCNOption = {from: 'en', to: 'zh-cn'};
  }
  translateAuto(words: string) {
    if (/[A-Za-z]/.test(words)) {
      return this.translateEN2ZH(words);
    } else {
      return this.translateZH2EN(words);
    }
  }
  translateZH2EN(words: String) {
    return this.translateCustom(words, this._toENOption);
  }
  translateEN2ZH(words: String) {
    return this.translateCustom(words, this._toCNOption);
  }

  translateCustom(words: String, options: Object): Promise<any> {
    return translate(words, options).then(function(res: any){
      console.log(res);
      return res.text;
    });
  }
};
