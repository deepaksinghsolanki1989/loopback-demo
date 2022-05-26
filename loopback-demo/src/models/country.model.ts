import {hasMany, model, property} from '@loopback/repository';
import {BaseEntity} from '.';
import {State} from './state.model';

@model()
export class Country extends BaseEntity {
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
  iso2: string;

  @property({
    type: 'string',
  })
  iso3: string;

  @property({
    type: 'string',
  })
  phoneCode: string;

  @property({
    type: 'string',
  })
  currency: string;

  @hasMany(() => State, {keyTo: 'countryId'})
  states: State[];

  constructor(data?: Partial<Country>) {
    super(data);
  }
}

export interface CountryRelations {
  // describe navigational properties here
}

export type CountryWithRelations = Country & CountryRelations;
