import {CreateSecteurDto} from "../dto/secture.dto";
import { Secteur } from "../schema/secteurs.schema";
 
export interface SecteurServiceInterface {
    create(createSecteurDto: CreateSecteurDto): Promise<Secteur>;
    findAll(page: number, limit: number): Promise<Secteur[]>;
    findOne(id: string): Promise<Secteur>;
    update(id: string, updateSecteurDto: { name?: string; codesPostaux?: string[] }): Promise<Secteur>;
    delete(id: string): Promise<Secteur>;
   
}