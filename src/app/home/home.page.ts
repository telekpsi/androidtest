import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

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
