interface ServerOption extends Record<string, any> {
  detail: (id: number) => Promise<unknown>
}

export abstract class FindController {
  private serve: ServerOption
  constructor(serve: ServerOption) {
    this.serve = serve
  }
  protected async find<T>(promise, id, type?: string): Promise<T> {
    if (type === 'delete') {
      const result = await this.serve.detail(id)
      await promise
      return result as T
    } else {
      await promise
      return (await this.serve.detail(id)) as T
    }
  }
}
