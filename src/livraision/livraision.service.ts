import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Livraison } from '../schema/livraision.schema';
import { CreateLivraisonDto } from '../dto/livraison.dto';

@Injectable()
export class LivraisonService {
    constructor(
        @InjectModel(Livraison.name) private livraisonModel: Model<Livraison>,
    ) {}

    async create(createLivraisonDto: CreateLivraisonDto): Promise<Livraison> {
        const createdLivraison = new this.livraisonModel(createLivraisonDto);
        return createdLivraison.save();
    }

    async findAll(): Promise<Livraison[]> {
        return this.livraisonModel
            .find()
            .populate('client')
            .populate('products')
            .populate('market')
            .populate('driver')
            .exec();
    }
    async findbycommande(NumeroCommande: string): Promise<Livraison> {
        return this.livraisonModel
            .findOne({ NumeroCommande })
            .populate('client')
            .populate('products')
            .populate('market')
            .populate('driver')
            .exec();
    }
    
}
