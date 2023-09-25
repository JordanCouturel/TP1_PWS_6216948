import { HttpClient,HttpHeaders,HttpClientModule  } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { Saison } from 'src/Models/Saison';
import { League } from 'src/Models/League';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';


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
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  title = 'TP1_6216948_PWS';
 

}
 

    


