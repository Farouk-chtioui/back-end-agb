import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePlanDto } from "../dto/plan.dto";
import { UpdatePlanDto } from "../dto/updatePlan.dto";
import { Plan } from "../schema/plans.schema";
import { PlanServiceInterface } from "../interfaces/plans.interface";

@Injectable()
export class PlansService implements PlanServiceInterface {
    constructor(
        @InjectModel(Plan.name) private planModel: Model<Plan>,
    ) {}

    async createPlan(createPlanDto: CreatePlanDto): Promise<Plan> {
        const createdPlan = new this.planModel(createPlanDto);
        return createdPlan.save();
    }

    async findAll(): Promise<Plan[]> {
        return this.planModel.find()
            .populate('market')
            .populate('secteurMatinal')
            .populate('secteurApresMidi')
            .exec();
    }

    async findById(id: string): Promise<Plan> {
        return this.planModel.findById(id)
            .populate('market')
            .populate('secteurMatinal')
            .populate('secteurApresMidi')
            .exec();
    }

    async findByDate(date: string): Promise<Plan[]> {
        return this.planModel.find({ Date: date })
            .populate('market')
            .populate('secteurMatinal')
            .populate('secteurApresMidi')
            .exec();
    }

    async deletePlan(id: string): Promise<Plan> {
        return this.planModel.findByIdAndDelete(id);
    }

    async updatePlan(id: string, updatePlanDto: UpdatePlanDto): Promise<Plan> {
        const updateData = {
            ...updatePlanDto,
            secteurMatinal: updatePlanDto.secteurMatinal?.length ? updatePlanDto.secteurMatinal : null,
            secteurApresMidi: updatePlanDto.secteurApresMidi?.length ? updatePlanDto.secteurApresMidi : null,
        };
        return this.planModel.findByIdAndUpdate(id, updateData, { new: true })
            .populate('market')
            .populate('secteurMatinal')
            .populate('secteurApresMidi')
            .exec();
    }
}
