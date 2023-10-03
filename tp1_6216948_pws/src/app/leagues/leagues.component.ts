import { HttpClient,HttpHeaders,HttpClientModule  } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { Saison } from 'src/Models/Saison';
import { League } from 'src/Models/League';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core/dist/public-api';


const headers = new HttpHeaders({
  'X-RapidAPI-Key': '92ba222157mshf144f2623794a76p1ee816jsn2d5def49ecb2',
  'X-RapidAPI-Host': 'api-hockey.p.rapidapi.com'
});


@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent {
  title = 'TP1_6216948_PWS';
  Reponse: any; // Variable pour stocker la réponse de l'API
  saisons: Saison[] = []; // Liste d'objets Saison
  leagues:League[]=[];
  leagueName?: string | null=null;

  

  constructor(private http: HttpClient,private route:ActivatedRoute) { }




  ngOnInit(): void {
    this.GetNHLLeague();
    this.leagueName=this.route.snapshot.paramMap.get('leagueName')
    
  }

  async GetNHLLeague(): Promise<void> {
    const url = `https://api-hockey.p.rapidapi.com/leagues/`;
    this.http.get<any>(url, { headers }).subscribe(
      (response) => {
        this.Reponse = response;
  
        const leagueFromResponse = this.Reponse.response[0];
  
  
        if (this.Reponse.response && this.Reponse.response.length > 0) {
          const seasonsData = leagueFromResponse.seasons;
          for (const season of seasonsData) {
            const saison = new Saison(season.start, season.end, season.season);
            this.saisons.push(saison);
          }
  
          for (const x of this.Reponse.response) {
            const ligue = new League(x.id,x.name, x.logo, x.seasons);
            this.leagues.push(ligue);
          }
          //enregistre la liste des parents dans le localstorage
          localStorage.setItem('leagues', JSON.stringify(this.leagues));
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}

