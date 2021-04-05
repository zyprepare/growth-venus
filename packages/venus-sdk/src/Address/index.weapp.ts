import { IAddress, GetAddressReusult, SaveAddressParams } from './index'

class Address implements IAddress {
  getCacheAddress(): Promise<GetAddressReusult> {
    console.log('getCacheAddress wx')

    return new Promise(() => {})
  }

  getLocationAddress(): Promise<GetAddressReusult> {
    console.log('getLocationAddress wx')

    return new Promise(() => {})
  }

  showAddressSelectPage(): Promise<GetAddressReusult> {
    console.log('showAddressSelectPage wx')

    return new Promise(() => {})
  }

  saveAddress(addressInfo: SaveAddressParams): void {
    console.log('saveAddress wx')
  }
}

export default new Address()
