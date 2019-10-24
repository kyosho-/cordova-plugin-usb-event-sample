import { UsbEventId } from './usb-event-id.enum';
import { UsbDevice } from './usb-device';

export interface UsbListResult {
    id: UsbEventId;
    devices: UsbDevice;
}
