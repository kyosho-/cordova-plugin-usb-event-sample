import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { UsbEventId } from './usb-event-id.enum';
import { UsbResult } from './usb-result';

declare var cordova: any;

@Injectable({
  providedIn: 'root'
})
export class UsbService {

  private usbEventSubject: Subject<UsbResult> =
    new Subject<UsbResult>();
  usbEvent$: Observable<UsbResult> =
    this.usbEventSubject.asObservable();

  constructor() { }

  listDevices(): Promise<UsbResult> {
    return new Promise<UsbResult>((resolve, reject) => {
      cordova.plugins.usbevent.listDevices(
        (result: UsbResult) => resolve(result),
        (error: string) => reject(error));
    }).catch((error: any) => {
      throw new Error(error);
    });
  }

  registerEventCallback(): Promise<UsbResult> {
    return new Promise<UsbResult>((resolve, reject) => {
      cordova.plugins.usbevent.registerEventCallback(
        (result: UsbResult) => {
          if (typeof result !== 'object') {
            reject(`Invalid event. (event=${JSON.stringify(result)})`);
          }

          switch (result.id) {
            case UsbEventId.Registered:
              resolve(result);
              break;
            case UsbEventId.Attached:
            case UsbEventId.Detached:
              this.usbEventSubject.next(result);
              break;
            default:
              reject(`Unsupported event. (event=${JSON.stringify(result)})`);
          }
        },
        (error: string) => reject(error));
    }).catch((error: any) => {
      throw new Error(error);
    });
  }
}
