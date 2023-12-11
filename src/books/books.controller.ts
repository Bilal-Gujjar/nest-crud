import { Controller, Post, Body, Get, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ROLES_KEY, Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
//import { AuthGuard } from 'src/auth/guards/auth.guards';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()

  async create(@Body() createBookDto: CreateBookDto) {
    console.log(createBookDto);
    
    return this.booksService.create(createBookDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.User) 
  async update(@Param('id') id: string, @Body() updateBookDto: CreateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

}
