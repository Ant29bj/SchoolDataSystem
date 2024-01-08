import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { GenericController } from '../generics/generic.controller';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController extends GenericController<
  UsersEntity,
  UsersService
> {
  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }

  @ApiBody({ type: CreateUserDto, required: true })
  @Post()
  override async create(@Body() entity: UsersEntity) {
    return this.usersService.create(entity);
  }
}
