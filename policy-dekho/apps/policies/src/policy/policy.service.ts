import { Neo4jService } from '@dbc-tech/nest-neo4j';
import { Body, Injectable } from '@nestjs/common';
import { CreatePolicyDTO } from './dtos/create-policy.dto';

@Injectable()
export class PolicyService {
    constructor(private neo4jService: Neo4jService){

    }

    async create(payload:  CreatePolicyDTO){
        const id = Date.now().toString();
        const query = `CREATE (p:Policy 
            {   id:$id,
                name: $name,
                category: $category,
                premium: $premium,
                sumAssured: $sumAssured,
                provider: $provider,
                tenure: $tenure
              }) RETURN p`;
        const params = {
            id,
            ...payload
        }
        return await this.neo4jService.write(query,params);
    }

    async get(name?: string){
        let query;
        if(name){
             query = `MATCH (p:Policy
                {         name: $name}) RETURN p`;
        } else {
             query = `MATCH (p:Policy) RETURN p`;
        }
        
          const params = {name};
         const result =  await this.neo4jService.read(query, params);
         if(result.records.length > 0){
            const user = result.records.map(item => {
                return item.get('p').properties;
            });
            return user;
            }
        return 'policy not found';
    }
}
