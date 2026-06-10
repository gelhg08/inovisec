import { Case } from './case.interface';

export abstract class CasesRepository {
  abstract findAll(): Promise<Case[]>;
  abstract findById(id: string): Promise<Case | null>;
}