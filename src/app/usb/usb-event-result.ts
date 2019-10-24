import { UsbEventId } from './usb-event-id.enum';

export interface UsbEventResult {
    id: UsbEventId;
    vendorId?: number;
    productId?: number;
}
