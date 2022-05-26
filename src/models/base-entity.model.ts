import {Entity, model, property} from '@loopback/repository';

@model()
export class BaseEntity extends Entity {
  @property({
    type: 'string',
    default: 'ACTIVE',
  })
  status?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  deleted?: boolean;

  @property({
    type: 'string',
  })
  createdAt?: string;

  @property({
    type: 'string',
  })
  updatedAt?: string;

  @property({
    type: 'string',
  })
  deletedAt?: string;

  @property({
    type: 'string',
  })
  createdBy?: string;

  @property({
    type: 'string',
  })
  updatedBy?: string;

  @property({
    type: 'string',
  })
  deletedBy?: string;

  constructor(data?: Partial<BaseEntity>) {
    super(data);
  }
}

export interface BaseEntityRelations {
  // describe navigational properties here
}

export type BaseEntityWithRelations = BaseEntity & BaseEntityRelations;
