import { Component, OnInit } from '@angular/core';
import { UsbService } from './usb.service';
import { UsbEventResult } from './usb-event-result';
import { from } from 'rxjs';
import { UsbListResult } from './usb-list-result';


@Component({
  selector: 'app-usb',
  templateUrl: './usb.component.html',
  styleUrls: ['./usb.component.css']
})
export class UsbComponent implements OnInit {

  constructor(private usbService: UsbService) { }

  ngOnInit() {
    this.usbService.usbEvent$.subscribe(
      (result: UsbEventResult) => {
        console.log(result);
      }, (error: any) => {
        console.error(error);
      }
    );
  }

  list(): void {
    from(this.usbService.listDevices()).subscribe(
      (list: UsbListResult) => console.log(list),
      (error: any) => console.error(error));
  }

  registerCallback(): void {
    from(this.usbService.registerEventCallback()).subscribe(
      (result: UsbEventResult) => console.log(result),
      (error: any) => console.error(error));
  }
}
