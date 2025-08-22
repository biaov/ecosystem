export namespace Captcha {
  export interface DataType {
    id: string
    bgElem: {
      url: string
      size: number[]
    }
    elem: {
      url: string
      size: number[]
      initPos: number[]
    }
  }
}
