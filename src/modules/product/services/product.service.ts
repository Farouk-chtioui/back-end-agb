import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProdcutDto } from "../dto/product.dto";
import { Product } from "../schema/product.schema";
@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productsModle: Model<Product>) {}
    async createProduct(product: Product): Promise<Product>{
        const newProduct = new this.productsModle(product);
        return newProduct.save();
    }
    async create(product: ProdcutDto): Promise<Product> {
        const newProduct = new this.productsModle(product);
        return newProduct.save();
    }
    async findAllNoPage(): Promise<Product[]> {
        return this.productsModle.find().exec();
    }
    async findAll(page: number = 1, limit: number = 6): Promise<Product[]> {
        const skip = (page - 1) * limit;
        return this.productsModle.find().skip(skip).limit(limit).exec();
      }
    async findOne(id: string): Promise<Product>{
        return this.productsModle.findById(id).exec();
    }
    async update(id: string, product: ProdcutDto): Promise<Product> {
        return this.productsModle.findByIdAndUpdate(id, product, {new: true}).exec();
    }
    async delete(id:string):Promise<Product>{
        if(!id) throw new Error('Id is required');
        if(!this.productsModle.findById(id)) throw new Error('Product not found');
        return this.productsModle.findByIdAndDelete(id);
    }
    async searchProduct(searchTerm: string): Promise<Product[]>{    
        const regex = new RegExp(searchTerm, 'i');
        return this.productsModle.find({
            $or: [
                { name: { $regex: regex } },
                { description: { $regex: regex } }
            ]
        }).exec();
    }
    
}