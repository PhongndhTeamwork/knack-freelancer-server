import { Controller, Get, HttpException, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@guard/jwt-auth.guard";
import { Request } from "express";


@Controller("user")
@ApiTags("User")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: Request) {
    const user: any = req.user;
    // console.log(user);
    const result = await this.userService.getProfile(+user?.id);
    if (result instanceof HttpException) {
      throw result;
    }
    return result;
  }

}
