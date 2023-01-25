import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Booking } from './booking.model';


interface BookingData{
    dateFrom:string,
    dateTo:string,
     placeId:string,
     userId:string,
     placeTitle:string,
     placeImage:string,
     firstName:string,
     lastName:string,
     gusetNumber:number,
}

@Injectable({
  providedIn: 'root'
})

export class BookingService {
  private _bookings =new BehaviorSubject<Booking[]>([
    // { id:'b1',
    //  placeId:'p1',
    //  placeTitle:'comilla',
    //  gusetNumber:2,
    //  userId:'abd'}
   ]) ;

  get bookings(){
    // return [...this._bookings]
    return this._bookings.asObservable();

  }
  constructor(
    private authService:AuthService,
    private http:HttpClient
  ) { }

  addBooking(
    placeId:string,
    placeTitle:string,
    placeImage:string,
    firstName:string,
    lastName:string,
    gusetNumber:number,
    dateFrom:Date,
    dateTo:Date
  ){
    let generatedId:string;
    const newBooking= new Booking(
      Math.random().toString(),
      placeId,
      this.authService.userId,
      placeTitle,
      placeImage,
      firstName,
      lastName,
      gusetNumber,
      dateFrom,
      dateTo
    );
    return this.http.post<{name:string}>('https://ionic-angular-first-project-default-rtdb.firebaseio.com/bookings.json',
    {...newBooking,id:null}
    ).pipe(
     switchMap(resData=>{
      generatedId=resData.name;
      return this.bookings;

     }),
      take(1),
      tap(booking=>{
      newBooking.id=generatedId;
      this._bookings.next(booking.concat(newBooking))
     })
    )
    // return this.bookings.pipe(
    //   take(1),
    //   delay(1000),
    //   tap(booking=>{
    //     this._bookings.next(booking.concat(newBooking))
    //   })
    // )
  }

  fetchBooking(){
    return this.http.get<{[key:string]:BookingData}>(`https://ionic-angular-first-project-default-rtdb.firebaseio.com/bookings.json?otfrtBy="userId"&equalTo="${
      this.authService.userId
    }"`
    )
    .pipe(map(bookingData=>{
      const bookings=[];
      for(const key in bookingData){
        if(bookingData.hasOwnProperty(key)){
          bookings.push(
            // new Booking(
            //   key,
            //   bookingData[key].placeId,
            //   bookingData[key].userId,
            //   bookingData[key].imgUrl,
            //   bookingData[key].price,
            //   new Date(bookingData[key].dateFrom),
            //   new Date(bookingData[key].dateTo),
            //   bookingData[key].userId
            // )
          );
        }
      }
      // return bookings;
    },
    tap(places=>{
      // this._places.next(places);
    }))
    )

  }

  cancelBooking(bookingId:string){
    this.http.delete(`https://ionic-angular-first-project-default-rtdb.firebaseio.com/bookings/${bookingId}.json`
    ).pipe(switchMap(()=>{
      return this.bookings;
    }),
    take(1),
    tap(booking=>{
      this._bookings.next(booking.filter(b=>b.id !== bookingId));
    }))
    return this.bookings.pipe(
      take(1),
      delay(1000),
      tap(booking=>{
        this._bookings.next(booking.filter(b=>b.id !==bookingId));
      })
    )
  }
}
