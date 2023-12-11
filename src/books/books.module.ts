import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schema';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]), AuthModule,ConfigModule],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}