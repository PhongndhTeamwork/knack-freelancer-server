import { IsDefined, IsEmail, IsOptional, IsString } from "class-validator";


export class SignupDto {
  @IsString()
  @IsDefined()
  clerkUserId: string;

  @IsOptional()
  imageSrc: string;

  @IsDefined()
  @IsString()
  username: string;

  @IsEmail()
  @IsOptional()
  email: string;

  constructor(clerkUserId: string, imageSrc: string, username: string, email: string) {
    this.clerkUserId = clerkUserId;
    this.imageSrc = imageSrc;
    this.username = username;
    this.email = email;
  }
}