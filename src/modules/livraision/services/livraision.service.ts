import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Livraison } from '../schema/livraision.schema';
import { CreateLivraisonDto } from '../dto/livraison.dto';
import { LivraisonServiceInterface } from '../interfaces/livraision.interface';
import { Status } from '../../../enums/status.enum';

@Injectable()
export class LivraisonService implements LivraisonServiceInterface {
    constructor(
        @InjectModel(Livraison.name) private livraisonModel: Model<Livraison>,
    ) {}

    async createLivraison(createLivraisonDto: CreateLivraisonDto): Promise<Livraison> {
        const createdLivraison = new this.livraisonModel(createLivraisonDto);
        return createdLivraison.save();
    }

    async findAll(page: number = 1): Promise<Livraison[]> {
        const perPage = 10;
        return this.livraisonModel
            .find()
            .skip((page - 1) * perPage)
            .limit(perPage)
            .populate('client', '-password')
            .populate({ path: 'products.productId', model: 'Product' })
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
            .populate('market', '-password')
            .populate('driver', '-password')
            .exec();
    }

    async updateStatus(id: string, status: Status): Promise<Livraison> {
        return this.livraisonModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
    }

    async deleteCommande(id: string): Promise<Livraison> {
        return this.livraisonModel.findByIdAndDelete(id).exec();
    }

    async update(id: string, createLivraisonDto: CreateLivraisonDto): Promise<Livraison> {
        return this.livraisonModel.findByIdAndUpdate(id, createLivraisonDto, { new: true }).exec();
    }

    async searchLivraison(searchTerm: string): Promise<Livraison[]> {
        const regex = new RegExp(searchTerm, 'i');
        return this.livraisonModel.find({
            $or: [
                { NumeroCommande: { $regex: regex } },
                { status: { $regex: regex } },
            ],
        })
        .populate('client', '-password')
        .populate({
            path: 'products.productId',
            model: 'Product',
        })
        .populate('market')
        .populate('driver')
        .exec();
    }
}
