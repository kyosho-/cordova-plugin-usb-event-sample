import { UsbEventId } from './usb-event-id.enum';
import { UsbDevice } from './usb-device';

export interface UsbModel {
    id: UsbEventId;
    devices?: UsbDevice[];
}
