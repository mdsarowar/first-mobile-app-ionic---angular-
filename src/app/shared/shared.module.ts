import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Capacitor } from "@capacitor/core/types/global";
import { IonicModule } from "@ionic/angular";
import { MapModalComponent } from "./map-modal/map-modal.component";
import { ImagePickerComponent } from "./pickers/image-picker/image-picker.component";
import { LocationPickerComponent } from "./pickers/location-picker/location-picker.component";


@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    IonicModule
    // PlacePageRoutingModule
  ],
  declarations: [LocationPickerComponent,MapModalComponent,ImagePickerComponent],

  // declarations:[
  //   LocationPickerComponent,
  //   MapModalComponent],
  exports:[LocationPickerComponent,MapModalComponent,ImagePickerComponent],
  entryComponents:[MapModalComponent]
})
export class SharedModule{}
