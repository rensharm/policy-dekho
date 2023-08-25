import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpDTo } from './dtos/sign-up.dto';
import { DatabaseRepository } from '../database/database-repository';

const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private readonly dbRepository: DatabaseRepository,) {}

  async signIn(username: string, pass: string): Promise<any> {
    const result = await this.usersService.getUser(username);
    if(result.records.length > 0){
      const user = result.records[0].get('p').properties;
      if (user && await bcrypt.compare(pass, user.password)) {
        const payload = { sub: user.id, username: user.username };
        return payload
      }
      return {};
    }
    return {}; 
  }

  async signUp(dto: SignUpDTo): Promise<any> {
    const user = await this.usersService.getUser(dto.username);
    if (user.records.length > 0) {
      throw new Error('user already exists')
    }
    const saltOrRounds = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(dto.password, saltOrRounds);
      
    const id = Date.now().toString();
        const query = `CREATE (p:User 
            {   id:$id,
                username: $username,
                password: $password,
                contactNo: $contactNo,
                address: $address,
                policies: []
              }) RETURN p`;
        const params = {
            id,
            ...dto,
            password: hash
        }

        const result = await this.dbRepository.addNode(query,params);
        return 'Done';
  }
}