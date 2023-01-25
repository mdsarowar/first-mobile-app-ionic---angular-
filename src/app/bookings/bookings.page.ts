import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})


export class BookingsPage implements OnInit ,OnDestroy {
  loadedBooking!:Booking[];
  private booksub!:Subscription

  constructor(private bookingService:BookingService) { }

  ngOnInit() {
    // this.loadedBooking=this.bookingService.bookings
    this.booksub=this.bookingService.bookings.subscribe(booking=>{
      this.loadedBooking=booking;

    })
  }

  onDelet(bookingId:string,slidingItem:IonItemSliding){
    slidingItem.close
  }

  ngOnDestroy(): void {
    if(this.booksub){
this.booksub.unsubscribe();
    }
  }


}
