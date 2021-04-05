export interface SaveAddressParams {
    addressId: string;
    provinceId: number;
    cityId: number;
    countyId: number;
    townId: number;
    detailAddress: string;
    lng: number;
    lat: number;
    provinceName: string;
    cityName: string;
    countyName: string;
    townName: string;
    fullAddress: string;
    errMsg?: string;
    isHaiwai: boolean | 0 | 1;
}
export interface GetAddressReusult {
    orderLng: number | '';
    orderLat: number | '';
    locationId: string;
    addressText: string;
    isHaiwai: boolean | 0 | 1;
}
export interface IAddress {
    getCacheAddress(): Promise<GetAddressReusult>;
    getLocationAddress(): Promise<GetAddressReusult>;
    showAddressSelectPage(sku: string): Promise<GetAddressReusult>;
    saveAddress(addressInfo: SaveAddressParams): void;
}
declare class Address implements IAddress {
    getCacheAddress(): Promise<GetAddressReusult>;
    getLocationAddress(): Promise<GetAddressReusult>;
    showAddressSelectPage(): Promise<GetAddressReusult>;
    saveAddress(addressInfo: SaveAddressParams): void;
}
declare const _default: Address;
export default _default;
