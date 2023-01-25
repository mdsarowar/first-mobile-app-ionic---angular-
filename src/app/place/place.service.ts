import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, of, pipe, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Place } from './place.model';


interface PlaceData{
  dateFrom:string;
  dateTo:string;
  description:string;
  imgUrl:string;
  price:number;
  title:string;
  userId:string;
}


@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  // new Place(
  //   'p1',
  // 'first demo',
  // 'in the fist demo place',
  // 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
  // 140,
  // new Date('12/10/12'),
  // new Date('12/12/12'),
  // 'abc'
  // ),
  // new Place('p2',
  // 'second demo',
  // 'in the second demo place',
  // 'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_960_720.jpg',
  // 150,
  // new Date('12/10/12'),
  // new Date('12/12/12'),
  // 'abc'
  // ),
  // new Place('p3',
  // 'thired demo',
  // 'in the thired demo place',
  // 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_960_720.jpg',
  // 160,
  // new Date('12/10/12'),
  // new Date('12/12/12'),
  // 'abc'
  // )
  private _places= new BehaviorSubject< Place[] >([]);
  // asObservable: any;

  // get allPlaces(){
  //   return [...this._places];
  // }

  constructor( private authservice:AuthService,private http:HttpClient) { }
  get allPlaces(){

    return this._places.asObservable()
  }

   Placeid(id:string){
   return this.http.get<PlaceData>(
    `https://ionic-angular-first-project-default-rtdb.firebaseio.com/offered-places/${id}.json`
   ).pipe(
    map(placeData =>{
      return new Place(
        id,
        placeData.title,
        placeData.description,
        placeData.imgUrl,
        placeData.price,
        new Date(placeData.dateFrom),
        new Date(placeData.dateTo),
        placeData.userId);
    })
   )

  }


  fetchPlaces(){
    return this.http.get<{[key:string]:PlaceData}>('https://ionic-angular-first-project-default-rtdb.firebaseio.com/offered-places.json')
    .pipe(map(resData=>{
      const places=[];
      for(const key in resData){
        if(resData.hasOwnProperty(key)){
          places.push(
            new Place(
              key,
              resData[key].title,
              resData[key].description,
              resData[key].imgUrl,
              resData[key].price,
              new Date(resData[key].dateFrom),
              new Date(resData[key].dateTo),
              resData[key].userId
            )
          );
        }
      }
      return places;
    }),
    tap(places=>{
      this._places.next(places);
    })
    )

  }

  addPlace(title:string,description:string,price:number,dateFrom:Date,dateTo:Date){
    let generatedId:string
    const newPlace=new Place(
      Math.random().toString(),
      title,
      description,
      'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_960_720.jpg',
      price,
      dateFrom,
      dateTo,
      this.authservice.userId
      );
      return this.http.post<{name:string}>('https://ionic-angular-first-project-default-rtdb.firebaseio.com/offered-places.json',{
        ...newPlace,
        id:null
      }).pipe(
        switchMap(resData=>{
          generatedId=resData.name;
          return this.allPlaces;
        }),
        take(1),
        tap(place=>{
          newPlace.id=generatedId;
          this._places.next(place.concat(newPlace));

        }
          )
      );
      // return this.place.pipe(
      //   take(1),
      //   delay(1000),
      //   tap(Place=>{
      //     this._places.next(this.place.concat(newPlace));
      //   })
      // )
      // this._places.push(newPlace)
  }

  updatePlace(Placeid:string,title:string,description:string){
    let updatedPlaces:Place[];
   return this.allPlaces.pipe(
      take(1),
      switchMap(place =>{
        if(!place || place.length<=0){
          return this.fetchPlaces();
        }else{
          return of(place);
        }}),
        switchMap(place=>{
        const updatedPlaceIndex=place.findIndex(pl=>pl.id==Placeid);
        const updatedPlaces=[...place];
        const oldPlace=updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex]=new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imgUrl,
          oldPlace.price,
          oldPlace.dateFrom,
          oldPlace.dateTo,
          oldPlace.userId
        );
        return this.http.put(`https://ionic-angular-first-project-default-rtdb.firebaseio.com/offered-places/${Placeid}.json`,
        {
          ...updatedPlaces[updatedPlaceIndex],id:null
        }
        );
        }),
      tap(()=>{
        this._places.next(updatedPlaces);
      })
    );


    // return this.allPlaces.pipe(take(1),
    // delay(1000),
    // tap(place=>{
    //   const updatedPlaceIndex=place.findIndex(pl=>pl.id==Placeid);
    //   const updatedPlaces=[...place];
    //   const oldPlace=updatedPlaces[updatedPlaceIndex];
    //   updatedPlaces[updatedPlaceIndex]=new Place(
    //     oldPlace.id,
    //     title,
    //     description,
    //     oldPlace.imgUrl,
    //     oldPlace.price,
    //     oldPlace.dateFrom,
    //     oldPlace.dateTo,
    //     oldPlace.userId
    //   );

    // }))

  }

}
