import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignupDto } from "@authentication/dto/sign-up.dto";
import { PrismaService } from "@prisma/prisma.service";


@Injectable()
export class AuthenticationService {
  constructor(private readonly jwtService: JwtService, private readonly prisma: PrismaService) {

  }

  async login(signupDto: SignupDto) {
    try {
      let checkUser;
      checkUser = await this.prisma.user.findFirst({
        where: {
          clerkUserId: signupDto.clerkUserId
        }
      });

      // const signedUpUser: SelectUser[] = await this.db.insert(users).values(signupDto).returning();
      if (!checkUser) {
        checkUser = await this.prisma.user.create({
          data: {
            clerkUserId: signupDto.clerkUserId,
            avatar: signupDto.imageSrc,
            social: signupDto.email,
            username: signupDto.username
          }
        });
      }
      const token = await this.jwtService.signAsync({
        id: checkUser.id
      });
      return {
        token: token,
        role: checkUser.role
      };
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
  }
}
