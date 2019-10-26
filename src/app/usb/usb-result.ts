import { UsbEventId } from './usb-event-id.enum';
import { UsbDevice } from './usb-device';

export interface UsbResult {
    id: UsbEventId;
    devices?: UsbDevice[];
}
