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
  translateZH2EN(words: String) {
    return this.translateCustom(words, this._toENOption);
  }
  translateEN2ZH(words: String) {
    return this.translateCustom(words, this._toCNOption);
  }

  translateCustom(words: String, options: Object): Promise<any> {
    // console.log(words);
    return translate(words, options).then(function(res: any){
      console.log(res);
      return res.text;
    }, error => console.log(error)).catch(function(error: any){
      console.error(error);
    });
  }
};
