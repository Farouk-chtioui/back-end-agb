import { Livraison } from "../schema/livraision.schema";
import { CreateLivraisonDto } from "../dto/livraison.dto";
export interface LivraisonServiceInterface {
    createLivraison(livraison: CreateLivraisonDto): Promise<Livraison>;
    findAll(): Promise<Livraison[]>;
    findById(id: string): Promise<Livraison>;
    findByCommande(numeroCommande: string): Promise<Livraison[]>;
    updateStatus(id: string, status: string): Promise<Livraison>;
    deleteCommande(id: string): Promise<Livraison>;
    updateCommande(id: string, livraison: CreateLivraisonDto): Promise<Livraison>;
    searchLivraison(search: string): Promise<Livraison[]>;
}
