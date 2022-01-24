import { Injectable } from '@angular/core';
import { Camera, CameraResultType, } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  
  constructor() { }

  async takePicture(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      height: 120,
      saveToGallery: true,
      resultType: CameraResultType.DataUrl
    });
    
    return image.dataUrl;
  }

}
