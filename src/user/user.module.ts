import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy'
import { JwtConfig } from 'src/config/jwt.config'
import { EmailModule } from 'src/email/email.module'
import { EmailService } from 'src/email/email.service'
import { LikesEntity } from 'src/like/entities/likes.entity'
import { SubscriptionEntity } from './entities/subscription.entity'
import { UserEntity } from './entities/user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: JwtConfig,
    }),
    TypeOrmModule.forFeature([UserEntity, SubscriptionEntity, LikesEntity]),
    EmailModule,
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, EmailService],
  exports: [UserService],
})
export class UserModule {}
