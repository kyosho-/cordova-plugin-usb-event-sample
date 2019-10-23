import { Component, OnInit } from '@angular/core';

declare var cordova: any;

@Component({
  selector: 'app-usb',
  templateUrl: './usb.component.html',
  styleUrls: ['./usb.component.css']
})
export class UsbComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  click(): void {
    cordova.plugins.usbevent.registerEventCallback(
      'test...',
      (result: string) => {
        console.log(result);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
