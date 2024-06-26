import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Livraison } from '../schema/livraision.schema';
import { CreateLivraisonDto } from '../dto/livraison.dto';
import { LivraisonServiceInterface } from '../interfaces/livraision.interface';

@Injectable()
export class LivraisonService implements LivraisonServiceInterface{
    constructor(
        @InjectModel(Livraison.name) private livraisonModel: Model<Livraison>,
    ) {}

    async createLivraison(createLivraisonDto: CreateLivraisonDto): Promise<Livraison> {
        const createdLivraison = new this.livraisonModel(createLivraisonDto);
        return createdLivraison.save();
    }

    async findAll(): Promise<Livraison[]> {
        return this.livraisonModel
            .find()
            .populate('client', '-password') // Assuming you have a 'client' reference in Livraison schema
            .populate({
                path: 'products.productId',
                model: 'Product',
            })
            .populate('market')
            .populate('driver')
            .exec();
    }

    async findById(id: string): Promise<Livraison> {
        return this.livraisonModel
            .findById(id)
            .populate('client', '-password')
            .populate({
                path: 'products.productId',
                model: 'Product',
            })
            .populate('market')
            .populate('driver')
            .exec();
    }

    async findByCommande(numeroCommande: string): Promise<Livraison[]> {
        return this.livraisonModel
            .find({ NumeroCommande: numeroCommande })
            .populate('client', '-password')
            .populate({
                path: 'products.productId',
                model: 'Product',
            })
            .populate('market','-password')
            .populate('driver','-password')
            .exec();
    }
    async updateStatus(id: string, status: string): Promise<Livraison> {
        return this.livraisonModel.findByIdAndUpdate(id, { status }, { new: true }) 
    }
    async deleteCommande(id: string): Promise<Livraison> {
        return this.livraisonModel.findByIdAndDelete(id)
    }
    async updateCommande(id: string, createLivraisonDto: CreateLivraisonDto): Promise<Livraison> {
        return this.livraisonModel.findByIdAndUpdate(id, createLivraisonDto, { new: true })
    }
    
}
