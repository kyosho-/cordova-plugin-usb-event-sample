import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { UsbEventResult } from './usb-event-result';
import { UsbEventId } from './usb-event-id.enum';
import { UsbListResult } from './usb-list-result';

declare var cordova: any;

@Injectable({
  providedIn: 'root'
})
export class UsbService {

  private usbEventSubject: Subject<UsbEventResult> =
    new Subject<UsbEventResult>();
  usbEvent$: Observable<UsbEventResult> =
    this.usbEventSubject.asObservable();

  constructor() { }

  listDevices(): Promise<UsbListResult> {
    return new Promise<UsbListResult>((resolve, reject) => {
      cordova.plugins.usbevent.listDevices(
        (list: UsbListResult) => resolve(list),
        (error: string) => reject(error));
    }).catch((error: any) => {
      throw new Error(error);
    });
  }

  registerEventCallback(): Promise<UsbEventResult> {
    return new Promise<UsbEventResult>((resolve, reject) => {
      cordova.plugins.usbevent.registerEventCallback(
        (event: UsbEventResult) => {
          if (typeof event !== 'object') {
            reject(`Invalid event. (event=${JSON.stringify(event)})`);
          }

          switch (event.id) {
            case UsbEventId.Registered:
              resolve(event);
              break;
            case UsbEventId.Attached:
            case UsbEventId.Detached:
              this.usbEventSubject.next(event);
              break;
            default:
              reject(`Unsupported event. (event=${JSON.stringify(event)})`);
          }
        },
        (error: string) => reject(error));
    }).catch((error: any) => {
      throw new Error(error);
    });
  }
}
