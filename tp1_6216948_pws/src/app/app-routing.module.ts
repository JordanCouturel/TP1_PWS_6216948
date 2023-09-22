import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaisonsComponent } from './saisons/saisons.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'saisons/:leagueName', component: SaisonsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
