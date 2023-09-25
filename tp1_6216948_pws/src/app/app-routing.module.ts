import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaisonsComponent } from './saisons/saisons.component';
import { AppComponent } from './app.component';
import { RankingsComponent } from './rankings/rankings.component';



const routes: Routes = [
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
