import { toast } from '@/utils/function'

/**
 * 扫一扫
 */
export const useScan = () => {
  /**
   * 扫描结果
   */
  const scanResult = ref('')

  /**
   * 点击扫一扫
   */
  const onClickScan = () => {
    uni.scanCode({
      scanType: ['qrCode', 'barCode', 'datamatrix', 'pdf417'],
      success({ result }) {
        scanResult.value = result
      },
      fail() {
        toast('扫码失败')
      }
    })
  }

  return { scanResult, onClickScan }
}
