import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, Jsonp } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
const translate = require('google-translate-api-plus')('cn');
@Injectable()
export class GoogleTranslateApi {
  private _toENOption: Object;
  private _toCNOption: Object;
  constructor(private http: Http, private jsonp: Jsonp) {
    this._toENOption = {to: 'en'};
    this._toCNOption = {from: 'en', to: 'zh-cn'};
  }
  translateWord(word): Promise<any> {
    const queryUrl = `http://fanyi.youdao.com/openapi.do?keyfrom=translate-desktop&key=1216465251&type=data&doctype=json&version=1.1&q=${word}`;
    return fetch(queryUrl).then(this.extractData);
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
  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
};
