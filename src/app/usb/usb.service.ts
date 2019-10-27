import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { UsbEventId } from './usb-event-id.enum';
import { UsbModel } from './usb-model';

declare var cordova: any;

@Injectable({
  providedIn: 'root'
})
export class UsbService {

  private usbEventSubject: Subject<UsbModel> =
    new Subject<UsbModel>();
  usbEvent$: Observable<UsbModel> =
    this.usbEventSubject.asObservable();

  constructor() { }

  listDevices(filter?: UsbModel): Promise<UsbModel> {
    return new Promise<UsbModel>((resolve, reject) => {
      cordova.plugins.usbevent.listDevices(
        (result: UsbModel) => resolve(result),
        (error: string) => reject(error));
    }).catch((error: any) => {
      throw new Error(error);
    });
  }

  registerEventCallback(filter?: UsbModel): Promise<UsbModel> {
    return new Promise<UsbModel>((resolve, reject) => {
      cordova.plugins.usbevent.registerEventCallback(
        (result: UsbModel) => {
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

  unregisterEventCallback(): Promise<UsbModel> {
    return new Promise<UsbModel>((resolve, reject) => {
      cordova.plugins.usbevent.unregisterEventCallback(
        (result: UsbModel) => {
          if (typeof result !== 'object') {
            reject(`Invalid event. (event=${JSON.stringify(result)})`);
          }

          switch (result.id) {
            case UsbEventId.Unregistered:
              resolve(result);
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

  existsRegisteredCallback(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      cordova.plugins.usbevent.existsRegisteredCallback(
        (exists: boolean) => resolve(exists),
        (error: any) => reject(error));
    }).catch((error: any) => {
      throw new Error(error);
    });
  }
}
