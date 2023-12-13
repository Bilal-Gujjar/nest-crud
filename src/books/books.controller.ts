import { Controller, Post, Body, Get, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Roles([Role.Admin, Role.User]) 
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Roles([Role.Admin])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Roles([Role.Admin, Role.User]) 
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: CreateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Roles([Role.Admin])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.booksService.delete(id);
  }
}