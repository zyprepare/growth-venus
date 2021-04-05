import { IAddress, GetAddressReusult, SaveAddressParams } from './index'

class Address implements IAddress {
  getCacheAddress(): Promise<GetAddressReusult> {
    console.log('getCacheAddress h5')

    return new Promise(() => {})
  }

  getLocationAddress(): Promise<GetAddressReusult> {
    console.log('getLocationAddress h5')

    return new Promise(() => {})
  }

  showAddressSelectPage(): Promise<GetAddressReusult> {
    console.log('showAddressSelectPage h5')

    return new Promise(() => {})
  }

  saveAddress(addressInfo: SaveAddressParams): void {
    console.log('saveAddress h5')
  }
}

export default new Address()
