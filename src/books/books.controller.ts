import { Controller, Post, Body, Get, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.User) // Adjust based on your requirements
  async create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  async findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.User) // Adjust based on your requirements
  async update(@Param('id') id: string, @Body() updateBookDto: CreateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin) // Only Admin can delete books
  async remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
