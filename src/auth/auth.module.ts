import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.APP_JWT_SECRET,
      signOptions: { expiresIn: '1 days' },
    }),
    UserModule,
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
  ],
})
export class AuthModule {}
