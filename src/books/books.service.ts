import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './interfaces/book.interface';


@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>,
  
  ) {}


  async create(createBookDto: CreateBookDto, user: any): Promise<Book> {
    console.log("user------------@@@@@@@@@@***********@@@@@@@@@@----------=======>", user.userId);
  
    const createdBook = new this.bookModel({
      ...createBookDto,
      createdBy: [user.userId], 
    });
  
    return createdBook.save();
  }

  // async findAll(): Promise<Book[]> {
  //   return this.bookModel.find().exec()
  // }


  async findOne(id: string): Promise<Book> {
    return await this.bookModel.findById(id).exec();
  }

  async update(id: string, updateBookDto: CreateBookDto): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return await this.bookModel.findByIdAndDelete(id).exec();
  }

  async findAll(user: any): Promise<Book[]> {

    if (user.role == 'superuser') {
      return this.bookModel.find().exec();
    } else {
      return this.bookModel.find({ createdBy: user.userId }).exec();
    }
  }

}
