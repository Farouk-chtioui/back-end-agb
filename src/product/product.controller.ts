import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ConfigService } from "@nestjs/config";
import { Product } from "src/schema/product.schema";
import { ProdcutCreation } from "src/dto/product.dto";


 @Controller('product')
 export class ProductController{
    constructor(
        private readonly productService: ProductService,
        private readonly configService: ConfigService,
      ) {}
      @Post()
        async create(@Body() productDto: ProdcutCreation): Promise<Product> {
            return this.productService.create(productDto);
        }
        @Get()
        async findAll() {
            return this.productService.findAll();
        }
        @Get(':id')
        async findOne(@Param('id') id: string) {
            return this.productService.findOne(id);
        }
        @Patch(':id')
        async update(@Param('id') id: string, @Body() product: Product) {
            return this.productService.update(id, product);
        }
        @Delete(':id')
        async delete(@Param('id') id: string) {
            return this.productService.delete(id);
        }
        @Get('search/:name')
        async searchProduct(@Param('name') name: string) {
            return this.productService.searchProduct(name);
        }
 }