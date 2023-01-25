import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Place } from 'src/app/place/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectplace!: Place ;

  constructor( private modalcrtl:ModalController) { }

  ngOnInit() {}

  onCancel(){
    this.modalcrtl.dismiss(null,'cancel');

  }

  onBookPlace(){
    this.modalcrtl.dismiss({message:'this is a dummy message!'},'confirm');

  }

}
