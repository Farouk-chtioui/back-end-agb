import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePlanDto } from "../dto/plan.dto";
import { UpdatePlanDto } from "../dto/updatePlan.dto";
import { Plan } from "../schema/plans.schema";
import { PlanServiceInterface } from "../interfaces/plans.interface";
import { plainToClass } from 'class-transformer';

@Injectable()
export class PlansService implements PlanServiceInterface {
    constructor(
        @InjectModel(Plan.name) private planModel: Model<Plan>,
    ) {}

    async createPlan(createPlanDto: CreatePlanDto): Promise<Plan> {
        if (!createPlanDto.market) {
            delete createPlanDto.market;
        }
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
        const deletedPlan = await this.planModel.findByIdAndDelete(id);
        if (!deletedPlan) {
            throw new NotFoundException(`Plan with ID ${id} not found`);
        }
        return deletedPlan;
    }

    async updatePlan(id: string, updatePlanDto: UpdatePlanDto): Promise<Plan> {
        const transformedPlan = plainToClass(UpdatePlanDto, updatePlanDto);
        const updatedPlan = await this.planModel.findByIdAndUpdate(id, { $set: transformedPlan }, { new: true })
            .populate('market')
            .populate('secteurMatinal')
            .populate('secteurApresMidi')
            .exec();

        if (!updatedPlan) {
            throw new NotFoundException(`Plan with ID ${id} not found`);
        }

        return updatedPlan;
    }


    async resetTotals(id: string): Promise<Plan> {
        const plan = await this.planModel.findById(id);
        if (!plan) {
            throw new NotFoundException(`Plan with ID ${id} not found`);
        }

        // Assume these values should be restored to some default values, e.g., from the initial state or config
        plan.totalMatin = plan.totalMatinInitial;
        plan.totalMidi = plan.totalMidiInitial;

        return plan.save();
    }

    async decreaseTotals(id: string, period: 'Matin' | 'Midi'): Promise<Plan> {
        const plan = await this.planModel.findById(id);
        if (!plan) {
            throw new NotFoundException(`Plan with ID ${id} not found`);
        }

        if (period === 'Matin') {
            plan.totalMatin = Math.max(plan.totalMatin - 1, 0);
        } else if (period === 'Midi') {
            plan.totalMidi = Math.max(plan.totalMidi - 1, 0);
        }

        return plan.save();
    }
}
