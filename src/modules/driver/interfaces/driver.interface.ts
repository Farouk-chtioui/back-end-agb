import { Driver } from "../schema/driver.schema";
import { DriverDto } from "../dto/driver.dto";
export interface DriverServiceInterface {
    createDriver(driver: DriverDto): Promise<Driver>;
    findAll(page: number): Promise<Driver[]>;
    findOne(id: string): Promise<Driver>;
    update(id: string, driver: Driver): Promise<Driver>;
    delete(id: string): Promise<Driver>;
    searchDriver(searchTerm: string): Promise<Driver[]>;
    login(email: string, password: string): Promise<Driver>;
}