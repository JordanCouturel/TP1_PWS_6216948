import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Saison } from 'src/Models/Saison';
import { ActivatedRoute } from '@angular/router';

const headers = new HttpHeaders({
  'X-RapidAPI-Key': '92ba222157mshf144f2623794a76p1ee816jsn2d5def49ecb2',
  'X-RapidAPI-Host': 'api-hockey.p.rapidapi.com'
});

@Component({
  selector: 'app-saisons',
  templateUrl: './saisons.component.html',
  styleUrls: ['./saisons.component.css']
})
export class SaisonsComponent implements OnInit {
  constructor(public http: HttpClient, private route: ActivatedRoute) {}

  Reponse: any;
  Seasons: Saison[] = [];

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      // Get the leagueName from the route parameter or provide a default value
      const leagueName = params.get('leagueName') ?? 'defaultLeagueName';
  
      // Fetch the seasons based on leagueName
      this.loadSeasons(leagueName);
    });
  }

  loadSeasons(pLeague: string) {
    const url = `https://api-hockey.p.rapidapi.com/leagues/?name=` + pLeague;
    this.http.get<any>(url, { headers }).subscribe(
      (response) => {
        this.Reponse = response;

        const leagueFromResponse = this.Reponse.response[0];
        // Check if there are seasons in the response
        if (this.Reponse.response && this.Reponse.response.length > 0) {
          // Create Saison objects and add them to the saisons array
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