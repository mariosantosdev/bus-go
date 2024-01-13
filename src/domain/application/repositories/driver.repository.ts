import { Repository } from '~/core/repositories/repository';
import { Driver } from '../entities/driver.entity';

export abstract class DriverRepository extends Repository<Driver> {}
