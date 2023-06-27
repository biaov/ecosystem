/**
 * 每页数量
 */
export const limit = 10

/**
 * 偏移量
 */
export const offset = (current = 1) => (current - 1) * limit
