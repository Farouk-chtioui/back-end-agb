import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Secteur } from '../schema/secteurs.schema';
import { CreateSecteurDto } from '../dto/secture.dto';
import { SecteurServiceInterface } from '../interfaces/secture.interface';
@Injectable()
export class SecteurService implements SecteurServiceInterface {
  constructor(@InjectModel(Secteur.name) private secteurModel: Model<Secteur>) {}

  async create(createSecteurDto: CreateSecteurDto): Promise<Secteur> {
    const createdSecteur = new this.secteurModel(createSecteurDto);
    return createdSecteur.save();
  }

   async findAll(page: number=1, limit: number=6): Promise<Secteur[]> {
    const skip = (page - 1) * limit;
    return this.secteurModel.find().skip(skip).limit(limit).exec();
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