import { Controller, Post, Body, Get, Param, Delete, Put, UseGuards,Req } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}


  // @Roles([Role.Admin])
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Get('admin')
  // async findAdminBooks(@Req() req) {
  //     console.log("rettttttt==>",req.user);
  //     return this.booksService.findBooksByAdmin(req.user);
  //   }



  @Roles([Role.Admin,Role.SuperUser])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createBookDto: CreateBookDto, @Req() req) {
    return this.booksService.create(createBookDto, req.user);
  }

  @Roles([Role.SuperUser,Role.Admin])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(@Req() req) {
    return this.booksService.findAll(req.user);
  }


  
  @Roles([Role.Admin,Role.User])
  @UseGuards(JwtAuthGuard, RolesGuard)
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