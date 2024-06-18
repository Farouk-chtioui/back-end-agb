import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Secteur } from '../schema/secteurs.schema';

@Injectable()
export class SecteurService {
  constructor(@InjectModel(Secteur.name) private secteurModel: Model<Secteur>) {}

  async create(createSecteurDto: { name: string; codesPostaux: string[] }): Promise<Secteur> {
    const createdSecteur = new this.secteurModel(createSecteurDto);
    return createdSecteur.save();
  }

  async findAll(): Promise<Secteur[]> {
    return this.secteurModel.find().exec();
  }

  async findOne(id: string): Promise<Secteur> {
    return this.secteurModel.findById(id).exec();
  }

  async update(id: string, updateSecteurDto: { name?: string; codesPostaux?: string[] }): Promise<Secteur> {
    return this.secteurModel.findByIdAndUpdate(id, updateSecteurDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Secteur> {
    return this.secteurModel.findByIdAndDelete(id).exec();
  }
}