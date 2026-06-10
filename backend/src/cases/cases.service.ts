import { Injectable, NotFoundException } from '@nestjs/common';
import { CasesRepository } from './cases.repository';

@Injectable()
export class CasesService {
  constructor(private readonly repo: CasesRepository) {}

  findAll() {
    return this.repo.findAll();
  }

  async findOne(id: string) {
    const found = await this.repo.findById(id);
    if (!found) {
      throw new NotFoundException(`No existe el caso con id ${id}`);
    }
    return found;
  }
}