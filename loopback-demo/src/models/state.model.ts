import {hasMany, model, property} from '@loopback/repository';
import {BaseEntity} from '.';
import {City} from './city.model';

@model()
export class State extends BaseEntity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  shortCode: string;

  @property({
    type: 'string',
    required: true,
  })
  countryId: string;

  @hasMany(() => City, {keyTo: 'stateId'})
  cities: City[];

  constructor(data?: Partial<State>) {
    super(data);
  }
}

export interface StateRelations {
  // describe navigational properties here
}

export type StateWithRelations = State & StateRelations;
