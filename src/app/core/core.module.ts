import { NgModule, Optional, SkipSelf } from '@angular/core';
import { GoogleTranslateApi } from './google-translate-api.service';
import { Logger } from './logger.service';

import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
  providers: [GoogleTranslateApi, Logger]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
};
