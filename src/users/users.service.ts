import { ConflictException , Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserReposService } from 'src/database/users.repository.service';


@Injectable()
export class UsersService {

  constructor(
    private userRepository: UserReposService
  ) { }

  async create(createUserDto: CreateUserDto) {    
      if (await this.userRepository.getByEmail(createUserDto.email))
        throw new ConflictException("user already exist with this email")

      const saltRounds = 10;
      createUserDto.password = await bcrypt.hash(createUserDto.password, saltRounds)

      const userCreated = await this.userRepository.create(createUserDto)

      return userCreated;
  }

  async findAll() {
    return this.userRepository.getAll();
  }

  async findOne(id: string) {
    const userFound = await this.userRepository.get(id);

    if (!userFound) throw new NotFoundException("user not Found")

    return userFound;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userRepository.update(id, updateUserDto);
    if (!updatedUser) throw new NotFoundException("user Not Found with provided ID")

    return updatedUser;
  }

  async remove(id: string) {
    const userDeleted = await this.userRepository.delete(id);
    if (!userDeleted) throw new NotFoundException("user Not Found with provided ID")

    return userDeleted;
  }
}
