import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntriesListComponent } from './components/entries-list/entries-list.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: EntriesListComponent },
  { path: 'add', component: AddTutorialComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
