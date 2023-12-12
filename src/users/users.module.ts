import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../auth/schemas/user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../common/config/database.module.config';


@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
