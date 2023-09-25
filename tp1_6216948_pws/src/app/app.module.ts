import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RankingsComponent } from './rankings/rankings.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SaisonsComponent } from './saisons/saisons.component';
import { RouterModule } from '@angular/router';
import { LeaguesComponent } from './leagues/leagues.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


@NgModule({
  declarations: [
    AppComponent,
    SaisonsComponent,
    RankingsComponent,
    LeaguesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot([
   
      { path: '', component: AppComponent },
      { path: 'ligues', component: LeaguesComponent },
      { path: 'saisons/:leagueName', component: SaisonsComponent },
      { path: 'classements/:leagueId/:Annee', component: RankingsComponent },
  ]),

  TranslateModule.forRoot({
    loader:{
      provide:TranslateLoader,
      useFactory:HttpLoaderFactory,
      deps:[HttpClient]
    }
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}