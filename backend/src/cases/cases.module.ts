import { Module } from '@nestjs/common';
import { CasesController } from './cases.controller';
import { CasesService } from './cases.service';
import { CasesRepository } from './cases.repository';
import { InMemoryCasesRepository } from './in-memory-cases.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule], 
  controllers: [CasesController],
  providers: [
    CasesService,
    { provide: CasesRepository, useClass: InMemoryCasesRepository },
  ],
})
export class CasesModule {}