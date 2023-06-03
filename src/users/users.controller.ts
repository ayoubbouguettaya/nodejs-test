import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseFilters, HttpException, ConflictException, UseInterceptors } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from 'src/exception-filter';
import { TransformInterceptor } from './transform.interceptor';

@Controller('users')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new TransformInterceptor())
@UsePipes(new ValidationPipe({ transform: true,whitelist: true }))
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({summary: "create a user"})
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: "retrieve all users" })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "retrieve user By Id" })
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "update user By Id" })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "remove user By Id" })
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
