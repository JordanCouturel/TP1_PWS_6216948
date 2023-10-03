import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Classement } from 'src/Models/Classement';
import { ActivatedRoute } from '@angular/router';
const headers = new HttpHeaders({
  'X-RapidAPI-Key': '92ba222157mshf144f2623794a76p1ee816jsn2d5def49ecb2',
  'X-RapidAPI-Host': 'api-hockey.p.rapidapi.com',
});

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit {
  standings: any[] = [];
 
  season: number = 2019; 
  Reponse: any;


  Classement: Classement[] = []
  NomEquipe?:string;
  LogoEquipe?:string;
  Position?:string;
  NomLeague?:string;

  Annee:string|null=null;
  leagueid:string|null=null;

  constructor(private http: HttpClient,private route: ActivatedRoute) {}
  ngOnInit(): void {

  

    this.route.paramMap.subscribe((params) => {
      const leagueId = params.get('leagueId') || '1';
      const annee=params.get('Annee') || ''
      this.leagueid=leagueId;
      this.Annee=annee;
    console.log(leagueId)
      this.loadStandings(leagueId,this.Annee );
      console.log(this.Reponse)
    });
  }


  loadStandings(leagueID: string, season: string) {
    const apiUrl = `https://api-hockey.p.rapidapi.com/standings/?league=${leagueID}&season=${season}`;

    this.http.get<any>(apiUrl, { headers }).subscribe(
      (response) => {

        console.log(response)
        const standings =response.response[0];
        for(const classement of standings ){

        const listEquipe= new Classement(classement.team.name,classement.team.logo,classement.position,classement.league.name);
        this.Classement.push(listEquipe);
        console.log('list',listEquipe)
        }
       
        // this.NomEquipe=response.response[0][0].team.name;
        // this.LogoEquipe=response.response[0][0].team.logo;
        // this.Position=response.response[0][0].position

      },
    
    );
  }
}