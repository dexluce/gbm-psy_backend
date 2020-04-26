import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { EvenementModule } from './evenement/evenement.module';
import { SubscriptionToEvenementModule } from './subscription-to-evenement/subscription-to-evenement.module';
import { MeetingModule } from './meeting/meeting.module';
import { AppFileModule } from './app-file/app-file.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.APP_DB_ADDRESS,
      port: +process.env.APP_DB_PORT,
      username: process.env.APP_DB_USER,
      password: process.env.APP_DB_PASSWORD,
      database: process.env.APP_DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AppFileModule,
    AuthModule,
    EvenementModule,
    MeetingModule,
    SubscriptionToEvenementModule,
    UserModule,
  ],
})
export class AppModule {}
