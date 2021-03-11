/**
 * 地址功能帮助类
 */
import { IAddressInfo } from './types';
declare class LocationHelper {
    private platform;
    constructor(platform?: string);
    /**
     * 显示地址选择控件
     * @param {String} venderId
     * @param {String} storeId
     * @param {Number} shopType
     */
    showAddressSelectPage(venderId?: string, storeId?: string, shopType?: number): Promise<IAddressInfo>;
    /**
     * 获取缓存地址
     */
    getCacheAddress(): Promise<IAddressInfo>;
    /**
     * 获取配送范围内的地址
     * @param {String} venderId
     * @param {String} storeId
     * @param {Number} shopType
     */
    getShowAddressWithStore(venderId?: string, storeId?: string, shopType?: number): Promise<unknown>;
    /**
     * 保存地址到全站缓存地址
     * @param {Object} addressInfo
     */
    saveAddress(addressInfo?: {}): Promise<unknown> | undefined;
    /**
     * 是否有定位权限
     */
    hasLocationPermission(): Promise<unknown>;
    /**
     * 是否开启GPS
     */
    isGpsOpen(): Promise<unknown>;
    /**
     * 获取当前定位地址
     */
    getLocationAddress(): Promise<IAddressInfo>;
    /**
     * 获取地址的经纬度和4级地址id
     * 先取定位地址，如果取到定位地址则将该地址保存到缓存中，如果没有则取全站缓存地址
     */
    getAddress(): Promise<unknown>;
    /**
     * 选择地址
     * @param {Object} app
     * @param {Function} callback
     */
    selectAddress(app: any, callback: any): void;
}
declare const _default: LocationHelper;
export default _default;
