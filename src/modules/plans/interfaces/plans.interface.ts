import { Plan } from "../schema/plans.schema";
import { CreatePlanDto } from "../dto/plan.dto";
export interface PlanServiceInterface {
    createPlan(plan: CreatePlanDto): Promise<Plan>;
    findAll(): Promise<Plan[]>;
    findById(id: string): Promise<Plan>;
    findByDate(date: string): Promise<Plan[]>;
    deletePlan(id: string): Promise<Plan>;
}