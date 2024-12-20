import { Body, Controller, HttpException, Post } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "@model/user/user.service";
import { SignupDto } from "@authentication/dto/sign-up.dto";

@Controller("auth")
@ApiTags("Authentication")
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService, private readonly userService: UserService) {
  }

  @Post("/login")
  async login(@Body() signupDto: SignupDto) {
    const result = await this.authenticationService.login(signupDto);
    if (result instanceof HttpException) {
      throw result;
    }
    // console.log(result);
    return result;
  }
}
