import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  scanActive = true;
  scanResult = null;
  @ViewChild('video', {static : false}) video : ElementRef;

  videoElement : any;

  constructor(private toastCtrl: ToastController) {}

  ngAfterViewInit() {
    // this.canvasElement = this.canvas.nativeElement;
    // this.canvasContext = this.canvasElement.getContext('2d');
    this.videoElement = this.video.nativeElement;
  }

  async startScan() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: 'environment'}
    });
    this.videoElement.srcObject = stream;
    this.videoElement.setAttribute('playsinline', true);
    this.videoElement.play(); //trigger the play operations
  }

  //helper functions
  stopScan() {
    this.scanActive = false;
  }

  reset() {
    this.scanResult = null;
  }

  async showQRToast () {
    const toast = await this.toastCtrl.create({
      message: 'Open ${this.scanResult}?',
      position: 'top',
      buttons: [
        {
          text:'Open',
          handler:() => {
            window.open(this.scanResult, '_system', 'location=yes');
          }
        }
      ]
    });
    toast.present();
  }
}
