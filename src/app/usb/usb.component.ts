import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';

import { UsbService } from './usb.service';
import { UsbModel } from './usb-model';


@Component({
  selector: 'app-usb',
  templateUrl: './usb.component.html',
  styleUrls: ['./usb.component.css']
})
export class UsbComponent implements OnInit {

  constructor(private usbService: UsbService) { }

  ngOnInit() {
    this.usbService.usbEvent$.subscribe(
      (result: UsbModel) => {
        console.log(result);
      }, (error: any) => {
        console.error(error);
      }
    );
  }

  list(): void {
    from(this.usbService.listDevices()).subscribe(
      (result: UsbModel) => console.log(result),
      (error: any) => console.error(error));
  }

  existsRegisteredCallback(): void {
    from(this.usbService.existsRegisteredCallback()).subscribe(
      (result: boolean) => console.log(result),
      (error: any) => console.error(error));
  }

  registerCallback(): void {
    from(this.usbService.registerEventCallback()).subscribe(
      (result: UsbModel) => console.log(result),
      (error: any) => console.error(error));
  }

  unregisterCallback(): void {
    from(this.usbService.unregisterEventCallback()).subscribe(
      (result: UsbModel) => console.log(result),
      (error: any) => console.error(error));
  }
}
