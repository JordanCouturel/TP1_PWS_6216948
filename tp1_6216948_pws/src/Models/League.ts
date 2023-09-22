import { Pays } from "./Pays"
import { Saison } from "./Saison"


export class League{
    constructor(public Id:string,public Nom:string,public Logo:string,  public Saisons:Saison[]  ){}
}