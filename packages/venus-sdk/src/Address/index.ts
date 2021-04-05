export interface SaveAddressParams {
  addressId: string
  provinceId: number
  cityId: number
  countyId: number
  townId: number
  detailAddress: string
  lng: number
  lat: number
  provinceName: string
  cityName: string
  countyName: string
  townName: string
  fullAddress: string
  errMsg?: string
  isHaiwai: boolean | 0 | 1
}

export interface GetAddressReusult {
  orderLng: number | ''
  orderLat: number | ''
  locationId: string
  addressText: string
  isHaiwai: boolean | 0 | 1
}

export interface IAddress {
  getCacheAddress(): Promise<GetAddressReusult>

  getLocationAddress(): Promise<GetAddressReusult>

  showAddressSelectPage(sku: string): Promise<GetAddressReusult>

  saveAddress(addressInfo: SaveAddressParams): void
}

class Address implements IAddress {
  getCacheAddress(): Promise<GetAddressReusult> {
    console.log('getCacheAddress default')

    return new Promise(() => {})
  }

  getLocationAddress(): Promise<GetAddressReusult> {
    console.log('getLocationAddress default')

    return new Promise(() => {})
  }

  showAddressSelectPage(): Promise<GetAddressReusult> {
    console.log('showAddressSelectPage default')

    return new Promise(() => {})
  }

  saveAddress(addressInfo: SaveAddressParams): void {
    console.log('address default')
  }
}

export default new Address()
