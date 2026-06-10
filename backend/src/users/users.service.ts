import { Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './user.interface';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly users: User[] = [];
  private readonly seed = [{ id: '1', username: 'admin', password: 'admin123' }];

  async onModuleInit() {
    for (const u of this.seed) {
      const passwordHash = await bcrypt.hash(u.password, 10);
      this.users.push({ id: u.id, username: u.username, passwordHash });
    }
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find((u) => u.username === username);
  }
}