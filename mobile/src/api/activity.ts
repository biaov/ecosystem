import { command, restful } from './factory'

/**
 * 抽奖活动
 */
export const drawPrizeApi = restful('/activity/draw-prize')

/**
 * 抽奖活动记录
 */
export const drawPrizeRecordApi = restful('/activity/draw-prize-record')

/**
 * 抽奖活动规则
 */
export const drawPrizeRulesApi = restful('/activity/draw-prize-rules')

/**
 * 抽奖操作
 */
export const drawPrizeDrawApi = command('/activity/draw-prize-draw')
