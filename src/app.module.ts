import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/config/database.module.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule,
    BooksModule,
  ],
})
export class AppModule {}
