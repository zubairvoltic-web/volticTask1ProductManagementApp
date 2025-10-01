import { Injectable } from '@nestjs/common';
import { CreateProDto } from './dto/create-pro.dto';
import { UpdateProDto } from './dto/update-pro.dto';

@Injectable()
export class ProService {
  create(createProDto: CreateProDto) {
    return 'This action adds a new pro';
  }

  findAll() {
    return `This action returns all pro`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pro`;
  }

  update(id: number, updateProDto: UpdateProDto) {
    return `This action updates a #${id} pro`;
  }

  remove(id: number) {
    return `This action removes a #${id} pro`;
  }
}
