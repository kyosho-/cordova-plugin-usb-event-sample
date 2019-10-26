import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';

import { UsbService } from './usb.service';
import { UsbResult } from './usb-result';


@Component({
  selector: 'app-usb',
  templateUrl: './usb.component.html',
  styleUrls: ['./usb.component.css']
})
export class UsbComponent implements OnInit {

  constructor(private usbService: UsbService) { }

  ngOnInit() {
    this.usbService.usbEvent$.subscribe(
      (result: UsbResult) => {
        console.log(result);
      }, (error: any) => {
        console.error(error);
      }
    );
  }

  list(): void {
    from(this.usbService.listDevices()).subscribe(
      (result: UsbResult) => console.log(result),
      (error: any) => console.error(error));
  }

  registerCallback(): void {
    from(this.usbService.registerEventCallback()).subscribe(
      (result: UsbResult) => console.log(result),
      (error: any) => console.error(error));
  }
}
