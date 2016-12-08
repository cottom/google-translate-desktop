import { Component } from '@angular/core';
import { GoogleTranslateApi } from '../core';
@Component({
  selector: 'gtd-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent {
  constructor(private translateService: GoogleTranslateApi) {
  }
  translateWord(text) {
    this.translateService.translateAuto(text).then(res => {
      console.log(res);
    });
  }
}
