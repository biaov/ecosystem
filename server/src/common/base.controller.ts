export abstract class FindController {
  serve: { detail: <T>(id: number) => Promise<T> }
  constructor(serve) {
    this.serve = serve
  }
  protected async find<T>(promise, id, type?: string): Promise<T> {
    if (type === 'delete') {
      const result = await this.serve.detail<T>(id)
      await promise
      return result
    } else {
      await promise
      return await this.serve.detail(id)
    }
  }
}
