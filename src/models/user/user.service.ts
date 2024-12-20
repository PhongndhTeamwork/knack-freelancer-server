import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService
  ) {

  }


  async getProfile(id: number) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id: id }
      })
      return {
        id: user.id,
        role: user.role,
        username: user.username,
        avatar: user.avatar,
        social : user.social
      }
    } catch (error) {
      return new InternalServerErrorException(error?.message)
    }
  }


}
