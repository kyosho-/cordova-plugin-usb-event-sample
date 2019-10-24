import { UsbEventId } from './usb-event-id.enum';

export interface UsbEventResult {
    event: UsbEventId;
    vendorId?: number;
    productId?: number;
}
