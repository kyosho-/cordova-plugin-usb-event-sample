import { Component, OnInit } from '@angular/core';
import { UsbService } from './usb.service';
import { UsbEventResult } from './usb-event-result';
import { from } from 'rxjs';


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

  click(): void {
    from(this.usbService.registerEventCallback()).subscribe(
      (result: UsbEventResult) => console.log(result),
      (error: any) => console.error(error));
  }
}
