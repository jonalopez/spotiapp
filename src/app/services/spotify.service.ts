import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient ) { 
    console.log("dsdasdasdas");
  }

  getQuery( query: string ){

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({

       'Authorization': 'Bearer BQA37jnfP6FdQtc5m6O2gv3LFx3IEZkj8klGxYFiiMhjoNNsgS2CDHQNrTRz9SBHMVe2t4CaVLhXGH4P2KDfcF59kNVVxagzyFCeDR-nqUpoBTg7imySJ9cSi0UH86CWgDCS_iKd-HYH8xCc4MaUT8IZaw'

    });   

    return this.http.get(url, { headers });
  }

  getNewReleases(){

    return this.getQuery('browse/new-releases?limit=20')
      .pipe( map( data => data['albums'].items));
  }

  getArtistas(termino: string){

    return this.getQuery(`search?q=${ termino }&type=artist&limits=15`)
      .pipe( map( data =>  data['artists'].items));
   
  }

  getArtista(id: string){

    return this.getQuery(`artists/${ id }`);
      //.pipe( map( data =>  data['artists'].items));
   
  }

  getTopTracks(id: string){

    return this.getQuery(`artists/${ id }/top-tracks?country=es`)
      .pipe( map( data =>  data['tracks']));
   
  }

}
