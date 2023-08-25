import { Neo4jService } from "@dbc-tech/nest-neo4j";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DatabaseRepository{

    constructor(private readonly neo4jService: Neo4jService) {
        
    }

    async addNode(query,params) {
        const result = await this.neo4jService.write(query,params);
        return result;
    }

    async updateNode(query,params) {
        const result = await this.neo4jService.write(query, params);
        return result;  
    }

    async deleteNode() { 

    }

    async getNode(query, params?) {
        const result = await this.neo4jService.read(query, params);
        return result;    
    }


}