import { Injectable } from '@nestjs/common';
import { Case } from './case.interface';
import { CasesRepository } from './cases.repository';
import { CASES_SEED } from './data/cases.seed';

@Injectable()
export class InMemoryCasesRepository extends CasesRepository {
  private readonly cases: Case[] = CASES_SEED;

  async findAll(): Promise<Case[]> {
    return this.cases;
  }

  async findById(id: string): Promise<Case | null> {
    return this.cases.find((c) => c.id === id) ?? null;
  }
}