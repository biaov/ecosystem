import { CartService } from './cart.service'
import { CreateCartDto, UpdateCartDto, SelectAllCartDto } from './cart.dto'

@UseGuards(AuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  list(@Headers('authorization') authToken: string) {
    const { userId } = useParseToken(authToken)
    return this.cartService.list(userId)
  }

  @Post()
  create(@Headers('authorization') authToken: string, @Body() body: CreateCartDto) {
    const { userId } = useParseToken(authToken)
    return this.cartService.create(userId, body)
  }

  @Patch(':id')
  update(@Headers('authorization') authToken: string, @IdParam() id: number, @Body() body: UpdateCartDto) {
    const { userId } = useParseToken(authToken)
    return this.cartService.update(userId, id, body)
  }

  @Delete(':id')
  delete(@Headers('authorization') authToken: string, @IdParam() id: number) {
    const { userId } = useParseToken(authToken)
    return this.cartService.delete(userId, id)
  }

  @Post('select-all')
  selectAll(@Headers('authorization') authToken: string, @Body() body: SelectAllCartDto) {
    const { userId } = useParseToken(authToken)
    return this.cartService.selectAll(userId, body.checked)
  }
}
