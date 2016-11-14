import { Routes, RouterModule } from '@angular/router';
import { DictionaryComponent } from './dictionary';
import { TranslateComponent } from './translate';
import { WordsBookComponent } from './words-book';

const ROUTES: Routes = [
  { path: '', redirectTo: '/dictionary',  pathMatch: 'full' },
  { path: 'dictionary',  component: DictionaryComponent },
  { path: 'translate', component: TranslateComponent },
  { path: 'words-book',    component: WordsBookComponent },
];
export { ROUTES };
