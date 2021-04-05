import { IAddress, GetAddressReusult, SaveAddressParams } from './index'

class Address implements IAddress {
  getCacheAddress(): Promise<GetAddressReusult> {
    console.log('getCacheAddress abc')

    return new Promise(() => {})
  }

  getLocationAddress(): Promise<GetAddressReusult> {
    console.log('getLocationAddress abc')

    return new Promise(() => {})
  }

  showAddressSelectPage(): Promise<GetAddressReusult> {
    console.log('showAddressSelectPage abc')

    return new Promise(() => {})
  }

  saveAddress(addressInfo: SaveAddressParams): void {
    console.log('saveAddress abc')
  }
}

export default new Address()
