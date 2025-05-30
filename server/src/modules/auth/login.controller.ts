import { LoginService } from './login.service'
import { LoginDto } from './auto.dto'

@Controller('login')
export class LoginController {
  constructor(private readonly userService: LoginService) {}

  @Post()
  login(@Body() { username, password }: LoginDto) {
    return this.userService.login(username, password)
  }
  @Post('admin')
  adminLogin(@Body() { username, password }: LoginDto) {
    return this.userService.adminLogin(username, password)
  }
}
