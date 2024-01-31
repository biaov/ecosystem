import { rpxTransformPx, toast, validatorPhone } from '@/utils/function'
import { drawPrizeRecordApi, drawPrizeDrawApi, drawPrizeRulesApi } from '@/api/activity'
import type { Option } from '@/types'
import type { RecordDataType, RuleDataType, UseRecordData, UseDrawPrize } from './types'

/**
 * 记录数据
 */
export const useRecordData = ({ activityId, deviceId, isDrawn, drawRestful }: UseRecordData.Option) => {
  const recordInfo = ref<RecordDataType | null>(null)
  const { formState, setFormRules, validatorForm } = useForm({ username: '', phoneNumber: '' })

  setFormRules({
    username: { required: true, message: '请输入用户名' },
    phoneNumber: {
      validator: (_, value) => {
        if (!validatorPhone(value)) return Promise.reject(new Error('请输入正确的手机号'))
        return Promise.resolve()
      }
    }
  })

  const [beforeValidtor, setBeforeValidtor] = useVisible(false)

  const loadRecordData = () => {
    const params = { deviceId }
    drawPrizeRecordApi
      .get<RecordDataType>(activityId.value, params)
      .then(res => {
        recordInfo.value = res
        if (res.holdName) {
          isDrawn.value = true
          drawRestful.value = `恭喜您抽中${res.holdName}`
        } else {
          isDrawn.value = false
          drawRestful.value = ''
        }
        setBeforeValidtor(false)
      })
      .catch(() => {
        setBeforeValidtor(true)
      })
  }

  const handleSubmit = async () => {
    if (!(await validatorForm())) return
    uni.showLoading({ title: '提交中' })
    const params = { ...formState.value, deviceId }
    drawPrizeRecordApi
      .update(activityId.value, params)
      .then(() => {
        setBeforeValidtor(false)
      })
      .catch(toast)
      .finally(() => {
        uni.hideLoading()
      })
  }

  return { beforeValidtor, loadRecordData, formState, handleSubmit }
}

/**
 * 抽奖
 */
export const useDrawPrize = ({ activityId, deviceId }: UseDrawPrize.Option) => {
  const isDrawn = ref(false)
  const itemHeight = rpxTransformPx(300)
  const translateAnimation = ref(null)
  const animation = uni.createAnimation({ timingFunction: 'ease-in-out' })

  const prizeList = ref<Option[]>([
    {
      label: '开始抽奖',
      value: '开始抽奖'
    }
  ])

  const [modalVisible, setModalVisible] = useVisible(false)

  const drawRestful = ref('恭喜您抽中一等奖')

  const duration = 4000
  let handleDrawLocked = false
  const handleDraw = () => {
    if (handleDrawLocked) return
    handleDrawLocked = true
    drawPrizeDrawApi
      .post<string>({ activityId: activityId.value, deviceId })
      .then(value => {
        const index = prizeList.value.findLastIndex(item => item.value === value)
        const translateY = -index * itemHeight
        animation.translateY(translateY).step({ duration })
        translateAnimation.value = animation.export()
        drawRestful.value = `恭喜您抽中${value}`
        nextTick(() => {
          setTimeout(() => {
            setModalVisible(true)
            setTimeout(() => {
              isDrawn.value = true
            }, 400)
          }, duration)
        })
      })
      .catch(toast)
  }

  const loadPrizeData = async () => {
    const data = await drawPrizeRulesApi.all<RuleDataType[]>({ activityId: activityId.value })
    const items = data.map(({ name }) => ({ label: name, value: name }))
    const list = Array.from({ length: 9 }, () => items).flat()
    prizeList.value.push(...list)
  }

  return { isDrawn, prizeList, translateAnimation, itemHeight, modalVisible, setModalVisible, drawRestful, handleDraw, loadPrizeData }
}
