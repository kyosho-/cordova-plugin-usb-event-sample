import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';

import { UsbService } from './usb.service';
import { UsbModel } from './usb-model';
import { UsbEventId } from './usb-event-id.enum';


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

  listNoneFilter0(): void {
    from(this.usbService.listDevices()).subscribe(
      (result: UsbModel) => console.log(result), // OK
      (error: any) => console.error(error));
  }

  listNoneFilter1(): void {
    const model: UsbModel = undefined;
    from(this.usbService.listDevices(model)).subscribe(
      (result: UsbModel) => console.log(result), // OK
      (error: any) => console.error(error));
  }

  listNoneFilter2(): void {
    const model: UsbModel = null;
    from(this.usbService.listDevices(model)).subscribe(
      (result: UsbModel) => console.log(result), // OK
      (error: any) => console.error(error));
  }

  listWithFilter0(): void {
    const model: UsbModel = {
      id: UsbEventId.Attached
    };
    from(this.usbService.listDevices(model)).subscribe(
      (result: UsbModel) => console.log(result),
      (error: any) => console.error(error)); // id is not 'include'. OK!
  }

  listWithFilter1(): void {
    const model: UsbModel = {
      id: UsbEventId.Include
    };
    from(this.usbService.listDevices(model)).subscribe(
      (result: UsbModel) => console.log(result), // No filter. OK
      (error: any) => console.error(error));
  }

  listWithFilter2(): void {
    const model: UsbModel = {
      id: UsbEventId.Include,
      devices: undefined
    };
    from(this.usbService.listDevices(model)).subscribe(
      (result: UsbModel) => console.log(result), // OK
      (error: any) => console.error(error));
  }

  listWithFilter3(): void {
    const model: UsbModel = {
      id: UsbEventId.Include,
      devices: null
    };
    from(this.usbService.listDevices(model)).subscribe(
      (result: UsbModel) => console.log(result), // OK
      (error: any) => console.error(error));
  }

  listWithFilter4(): void {
    const model: UsbModel = {
      id: UsbEventId.Include,
      devices: []
    };
    from(this.usbService.listDevices(model)).subscribe(
      (result: UsbModel) => console.log(result), // OK
      (error: any) => console.error(error));
  }

  listWithFilter5(): void {
    const model: UsbModel = {
      id: UsbEventId.Include,
      devices: [
        {
          vendorId: 1234,
          productId: 4321
        }
      ]
    };
    from(this.usbService.listDevices(model)).subscribe(
      (result: UsbModel) => console.log(result), // empty list... OK
      (error: any) => console.error(error));
  }

  listWithFilter6(): void {
    const model: UsbModel = {
      id: UsbEventId.Include,
      devices: [
        {
          vendorId: 1234,
          productId: 4321
        },
        {
          vendorId: 2343,
          productId: 9876
        }
      ]
    };
    from(this.usbService.listDevices(model)).subscribe(
      (result: UsbModel) => console.log(result), // empty list... OK
      (error: any) => console.error(error));
  }

  listWithFilter7(): void {
    const model: UsbModel = {
      id: UsbEventId.Include,
      devices: [
        {
          vendorId: 5446,
          productId: 424
        }
      ]
    };
    from(this.usbService.listDevices(model)).subscribe(
      (result: UsbModel) => console.log(result), // match! OK
      (error: any) => console.error(error));
  }

  listWithFilter8(): void {
    const model: UsbModel = {
      id: UsbEventId.Include,
      devices: [
        {
          vendorId: 5446,
          productId: 424
        },
        {
          vendorId: 5446,
          productId: 424
        },
        {
          vendorId: 2343,
          productId: 9876
        }
      ]
    };
    from(this.usbService.listDevices(model)).subscribe(
      (result: UsbModel) => console.log(result), // match! OK
      (error: any) => console.error(error));
  }

  existsRegisteredCallback(): void {
    from(this.usbService.existsRegisteredCallback()).subscribe(
      (result: boolean) => console.log(result),
      (error: any) => console.error(error));
  }

  registerCallbackWithNoneFilter0(): void {
    from(this.usbService.registerEventCallback()).subscribe(
      (result: UsbModel) => console.log(result),
      (error: any) => console.error(error));
  }

  registerCallbackWithNoneFilter1(): void {
    const model: UsbModel = undefined;
    from(this.usbService.registerEventCallback(model)).subscribe(
      (result: UsbModel) => console.log(result),
      (error: any) => console.error(error));
  }

  registerCallbackWithNoneFilter2(): void {
    const model: UsbModel = null;
    from(this.usbService.registerEventCallback(model)).subscribe(
      (result: UsbModel) => console.log(result),
      (error: any) => console.error(error));
  }

  registerCallbackWithFilter0(): void {
    const model: UsbModel = {
      id: UsbEventId.Attached
    };
    from(this.usbService.registerEventCallback(model)).subscribe(
      (result: UsbModel) => console.log(result),
      (error: any) => console.error(error)); // id is not 'include'. OK!
  }

  registerCallbackWithFilter1(): void {
    const model: UsbModel = {
      id: UsbEventId.Include
    };
    from(this.usbService.registerEventCallback(model)).subscribe(
      (result: UsbModel) => console.log(result), // No filter. OK
      (error: any) => console.error(error));
  }

  registerCallbackWithFilter2(): void {
    const model: UsbModel = {
      id: UsbEventId.Include,
      devices: undefined
    };
    from(this.usbService.registerEventCallback(model)).subscribe(
      (result: UsbModel) => console.log(result), // OK
      (error: any) => console.error(error));
  }

  registerCallbackWithFilter3(): void {
    const model: UsbModel = {
      id: UsbEventId.Include,
      devices: null
    };
    from(this.usbService.registerEventCallback(model)).subscribe(
      (result: UsbModel) => console.log(result), // OK
      (error: any) => console.error(error));
  }

  registerCallbackWithFilter4(): void {
    const model: UsbModel = {
      id: UsbEventId.Include,
      devices: []
    };
    from(this.usbService.registerEventCallback(model)).subscribe(
      (result: UsbModel) => console.log(result), // OK
      (error: any) => console.error(error));
  }

  registerCallbackWithFilter5(): void {
    const model: UsbModel = {
      id: UsbEventId.Include,
      devices: [
        {
          vendorId: 1234,
          productId: 4321
        }
      ]
    };
    from(this.usbService.registerEventCallback(model)).subscribe(
      (result: UsbModel) => console.log(result), // empty list... OK
      (error: any) => console.error(error));
  }

  registerCallbackWithFilter6(): void {
    const model: UsbModel = {
      id: UsbEventId.Include,
      devices: [
        {
          vendorId: 1234,
          productId: 4321
        },
        {
          vendorId: 2343,
          productId: 9876
        }
      ]
    };
    from(this.usbService.registerEventCallback(model)).subscribe(
      (result: UsbModel) => console.log(result), // empty list... OK
      (error: any) => console.error(error));
  }

  registerCallbackWithFilter7(): void {
    const model: UsbModel = {
      id: UsbEventId.Include,
      devices: [
        {
          vendorId: 5446,
          productId: 424
        }
      ]
    };
    from(this.usbService.registerEventCallback(model)).subscribe(
      (result: UsbModel) => console.log(result), // match! OK
      (error: any) => console.error(error));
  }

  registerCallbackWithFilter8(): void {
    const model: UsbModel = {
      id: UsbEventId.Include,
      devices: [
        {
          vendorId: 5446,
          productId: 424
        },
        {
          vendorId: 5446,
          productId: 424
        },
        {
          vendorId: 2343,
          productId: 9876
        }
      ]
    };
    from(this.usbService.registerEventCallback(model)).subscribe(
      (result: UsbModel) => console.log(result), // match! OK
      (error: any) => console.error(error));
  }

  unregisterCallback(): void {
    from(this.usbService.unregisterEventCallback()).subscribe(
      (result: UsbModel) => console.log(result),
      (error: any) => console.error(error));
  }
}
