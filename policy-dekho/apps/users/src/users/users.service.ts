import { HttpException, HttpStatus, Injectable, PreconditionFailedException } from '@nestjs/common';
import { DatabaseRepository } from '../database/database-repository';


@Injectable()
export class UsersService {
  

  constructor(private readonly dbRepository: DatabaseRepository){

  }

  async getProfile(username: string){
    const result = await this.getUser(username);
    if(result.records.length > 0){
      const user = result.records[0].get('p').properties;
      return user;
      }
    return 'user not found';
  }

   async getUser(username: string){
    const query = `MATCH (p:User
      {         username: $username}) RETURN p`;
    const params = {username};
   return await this.dbRepository.getNode(query, params);
  }

  async purchasePolicy(payload){
      const query =  `MATCH (u:User {username: $username})
                      MATCH (p:Policy {name: '$policyName'})
                      MERGE (u)-[rel:HAS_BOUGHT]->(p)
                      RETURN u,rel,p`;
      const result =  await this.dbRepository.updateNode(query, payload);
      return {success: 'Policy Purchased'};
    }

    async claimPolicy(payload){
      const query = `MATCH (u:User {username: $username})
                    MATCH (p:Policy {name: $policyName})
                    OPTIONAL MATCH (u)-[r:HAS_BOUGHT]->(p)
                    RETURN CASE WHEN r IS NULL THEN false ELSE true END AS has_relationship`
      const params = {
        username: payload.username,
        policyName: payload.policyName
      }
      const isRelated =  await this.dbRepository.getNode(query, params);
      const hasBought = isRelated.records[0].get('has_relationship');
      
      if(hasBought){
        const query =  `MATCH (u:User {username: $username})
                  MATCH (p:Policy {name: '$policyName'})
                  MERGE (u)-[rel:HAS_CLAIMED]->(p)
                  RETURN u,rel,p`;
        const result =  await this.dbRepository.updateNode(query, payload);
        return {success: 'Policy claimed'};

      } else {
        return {error: 'You must buy the policy before you claim it'};
      }
    }
    
}