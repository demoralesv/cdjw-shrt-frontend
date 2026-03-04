import { Routes } from '@angular/router';
import { GenUrl } from './pages/gen-url/gen-url';
import { ViewStats } from './pages/view-stats/view-stats';

export const routes: Routes = [
  { path: '', component: GenUrl },
  { path: 'stats', component: ViewStats },
  { path: '**', redirectTo: '' }
];
