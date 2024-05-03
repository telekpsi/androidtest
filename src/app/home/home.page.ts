import { Component } from '@angular/core';
import { TextZoom, GetPreferredResult, GetResult, SetOptions } from '@capacitor/text-zoom'
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  preferredResult: number = 0;
  result: number = 0;
  device: string = "";
  showImage = false;
  imageUrl = "";

  constructor() {
    TextZoom.getPreferred().then(preferred => {
      this.preferredResult = preferred.value;
    });
    TextZoom.get().then(result => {
      this.result = result.value;
    });
    Device.getInfo().then(info => {
      this.device = info.platform;
    })
  }

  tryShowImage() {
    this.imageUrl = "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png";
    this.showImage = true;
  }

  triggerFileOpen(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  async handleFileInput(input: HTMLInputElement) {
    if (input.files && input.files.length >= 1) {
      for (let index = 0; index < input.files.length; index++) {
        const filefile = input.files?.item(index);
        let formData = new FormData();
        const text = await filefile?.text();
        const arrayBuffer = await filefile?.arrayBuffer();
        console.log("text");
        console.log(text);
        console.log("arrayBuffer");
        console.log(arrayBuffer);
        formData.append('file',filefile!,filefile?.name);
        // formData.set("type",)
        const response = this.uploadDocument(formData);
        response.then(response => response.json())
          .then(result => {
            console.log("result");
            console.log(result);
          });
      }
    }
  }

  async uploadDocument(formData: FormData) {
    return fetch(`https://www.google.com`, {
      method: 'POST',
      body: formData,
      headers: {}
    });
  }
}
