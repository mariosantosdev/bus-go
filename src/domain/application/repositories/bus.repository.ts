import { Repository } from '~/core/repositories/repository';
import { Bus } from '../entities/bus.entity';

export abstract class BusRepository extends Repository<Bus> {}
