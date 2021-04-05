import { IAddress, GetAddressReusult, SaveAddressParams } from './index';
declare class Address implements IAddress {
    getCacheAddress(): Promise<GetAddressReusult>;
    getLocationAddress(): Promise<GetAddressReusult>;
    showAddressSelectPage(): Promise<GetAddressReusult>;
    saveAddress(addressInfo: SaveAddressParams): void;
}
declare const _default: Address;
export default _default;
