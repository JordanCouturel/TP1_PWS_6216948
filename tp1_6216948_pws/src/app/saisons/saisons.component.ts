import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Saison } from 'src/Models/Saison';

const headers = new HttpHeaders({
  'X-RapidAPI-Key': '92ba222157mshf144f2623794a76p1ee816jsn2d5def49ecb2',
  'X-RapidAPI-Host': 'api-hockey.p.rapidapi.com',
});

@Component({
  selector: 'app-saisons',
  templateUrl: './saisons.component.html',
  styleUrls: ['./saisons.component.css'],
})
export class SaisonsComponent implements OnInit {
  constructor(public http: HttpClient, private route: ActivatedRoute) {}
  
  Reponse: any;
  Seasons: Saison[] = [];
  leagueid:string |null=null;
  selectedyear:string |null=null;
  ngOnInit() {

    this.leagueid=this.route.snapshot.paramMap.get('leagueName')
    this.route.paramMap.subscribe((params) => {
      const leagueName = params.get('leagueName') ?? 'defaultLeagueName';
      this.loadSeasons(leagueName);
     

      
    });
  }

  loadSeasons(pLeague: string) {
   this.Seasons==null;
    const url = `https://api-hockey.p.rapidapi.com/leagues/?name=` + pLeague.trim();
    this.http.get<any>(url, { headers }).subscribe(
      (response) => {
        console.log('alloasdsa',response)
        this.leagueid=response.response[0].id
     console.log(this.leagueid)
        this.Reponse = response;
        console.log('Seasons Response:', response);
        const leagueFromResponse = this.Reponse.response[0];
        if (this.Reponse.response && this.Reponse.response.length > 0) {
          const seasonsData = leagueFromResponse.seasons;
          for (const season of seasonsData) {
            const saison = new Saison(season.start, season.end, season.season);
            this.Seasons.push(saison);
          }
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}