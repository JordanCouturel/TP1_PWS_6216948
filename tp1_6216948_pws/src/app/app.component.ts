import { HttpClient,HttpHeaders,HttpClientModule  } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { Pays } from 'src/Models/Pays';
import { Saison } from 'src/Models/Saison';
import { League } from 'src/Models/League';


const headers = new HttpHeaders({
  'X-RapidAPI-Key': '92ba222157mshf144f2623794a76p1ee816jsn2d5def49ecb2',
  'X-RapidAPI-Host': 'api-hockey.p.rapidapi.com'
});



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})







export class AppComponent implements OnInit {
  title = 'TP1_6216948_PWS';
  

  constructor(private http: HttpClient) { }


  Reponse: any; // Variable pour stocker la réponse de l'API
  saisons: Saison[] = []; // Liste d'objets Saison
  league:League[]=[];

  ngOnInit(): void {
    this.GetNHLLeague();
  }

  async GetNHLLeague(): Promise<void> {
    const url = `https://api-hockey.p.rapidapi.com/leagues/`;
  
    this.http.get<any>(url, { headers }).subscribe(
      (response) => {
        this.Reponse = response;
  
        // Create a league object from the API response
        const leagueFromResponse = this.Reponse.response[0];
  
        // Populate the pays array with the country information
        var pays = new Pays(leagueFromResponse.country.code, leagueFromResponse.country.name);
  
        // Check if there are seasons in the response
        if (this.Reponse.response && this.Reponse.response.length > 0) {
          // Create Saison objects and add them to the saisons array
          const seasonsData = leagueFromResponse.seasons;
          for (const season of seasonsData) {
            const saison = new Saison(season.start, season.end, season.season);
            this.saisons.push(saison);
          }
  
          // Create League objects and add them to the league array
          for (const x of this.Reponse.response) {
            const ligue = new League(x.name, x.logo, x.country, x.seasons);
            this.league.push(ligue);
          }
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
 

    


