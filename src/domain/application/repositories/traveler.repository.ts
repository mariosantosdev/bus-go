import { Repository } from '~/core/repositories/repository';
import { Traveler } from '../entities/traveler.entity';

export abstract class TravelerRepository extends Repository<Traveler> {}
