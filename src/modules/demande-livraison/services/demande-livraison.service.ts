import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDemandeLivraisonDto, UpdateDemandeLivraison } from '../dto/create-demande-livraison.dto';
// import { UpdateDemandeLivraisonStatusDto } from '../dto/update-demande-livraison-status.dto';
import { DemandeLivraison } from '../schema/demande-livraison.schema';

@Injectable()
export class DemandeLivraisonService {
    constructor(
        @InjectModel(DemandeLivraison.name) private demandeLivraisonModel: Model<DemandeLivraison>,
    ) {}

    async create(createDemandeLivraisonDto: CreateDemandeLivraisonDto): Promise<DemandeLivraison> {
        const createdDemandeLivraison = new this.demandeLivraisonModel(createDemandeLivraisonDto);
        return createdDemandeLivraison.save();
    }

    async findAll(page: number = 1): Promise<DemandeLivraison[]> {
        const perPage = 10;
        return this.demandeLivraisonModel
            .find()
            .skip((page - 1) * perPage)
            .limit(perPage)
            .populate('client', '-password')
            .populate({ path: 'products.productId', model: 'Product' })
            .populate('market','-password')
            .populate('driver')
            .exec();
    }

    async findOne(id: string): Promise<DemandeLivraison> {
        return this.demandeLivraisonModel.findById(id).exec();
    }

    // async updateStatus(id: string, updateDemandeLivraisonStatusDto: UpdateDemandeLivraisonStatusDto): Promise<DemandeLivraison> {
    //     return this.demandeLivraisonModel.findByIdAndUpdate(id, { status: updateDemandeLivraisonStatusDto.status }, { new: true }).exec();
    // }
    async delete(id: string): Promise<DemandeLivraison> {
        return this.demandeLivraisonModel.findByIdAndDelete(id).exec();
    }
    async modifyDemandeLivraison(id: string, updateDemandeLivraison: UpdateDemandeLivraison): Promise<DemandeLivraison> {
        return this.demandeLivraisonModel.findByIdAndUpdate(id, updateDemandeLivraison, { new: true }).exec();
    }
}
