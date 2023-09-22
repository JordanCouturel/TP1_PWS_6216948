import { Pays } from "./Pays"
import { Saison } from "./Saison"


export class League{
    constructor(public Nom:string,public Logo:string, public Pays:Pays, public Saisons:Saison[]  ){}
}