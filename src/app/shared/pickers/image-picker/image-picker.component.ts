import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { CameraSource } from '@capacitor/camera/dist/esm/definitions';
import { Capacitor, Plugins } from '@capacitor/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
// import { Capacitor, Plugins } from '@capacitor/core';
// import { Plugins,Capacitor } from '@Capacitor/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {

  selectedImage!:string;
  selecteimage:any;
  constructor() { }

  ngOnInit() {}

  onPickImage(){
    if(Capacitor.isPluginAvailable('Camera')){
      return;
    }
    const image = Camera.getPhoto({
      quality:50,
      source:CameraSource.Prompt,
      correctOrientation:true,height:320,width:200,
      resultType:CameraResultType.Uri


    }).then((image: any)=>{

    }).catch((err: any)=>{
      console.log(err)
      return false
    })
    // const image = await Camera.getPhoto({
    //   quality: 90,
    //   allowEditing: true,
    //   resultType: CameraResultType.Uri
    // });

  }

  checkPlatformForWeb(){
    if(Capacitor.getPlatform()=='web'){
      return true;
    }
    return false;
  }

  async getPicture(){
    const image = await Camera.getPhoto({
      quality: 90,
      source:CameraSource.Prompt,
      // allowEditing: true,
      width:600,
      resultType: this.checkPlatformForWeb()? CameraResultType.DataUrl:CameraResultType.Uri
    });
    console.log('image',image);
    this.selecteimage=image;
    if(this.checkPlatformForWeb()){
      this.selecteimage.webPath=image.dataUrl;
    }

    //storage picture

  const writeSecretFile = async () => {
    await Filesystem.writeFile({
      path: 'secrets/text.txt',
      data: "This is a test",
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
    console.log(writeSecretFile);
  };

  }

  async share(){
    await Share.share({
      title: 'share Picture whats up',
      text: 'Shareing an iage',
      url: this.selecteimage.path,
      dialogTitle: 'Share with whatsup',
    });
  }




}
