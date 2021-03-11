interface SYSTEMINFO {
  brand: string
  model: string
  pixelRatio: string
  screenWidth: string
  screenHeight: string
  windowWidth: string
  windowHeight: string
  statusBarHeight: string
  language: string
  version: string
  system: string
  platform: string
  hostCode: string
  hostVersionName: string
  SDKVersion: string
  notch: string
}

interface UUIDINFO {
  deviceUUId: string
  cartUUId: string
}

interface ACCOUNTINFO {
  miniProgram: {
    appId: string
  }
}


export const ISDEV = Object.keys(SYSTEMINFO).length === 0
