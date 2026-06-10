import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CasesService } from './cases.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('cases')
@UseGuards(JwtAuthGuard) 
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Get()
  findAll() {
    return this.casesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.casesService.findOne(id);
  }
}