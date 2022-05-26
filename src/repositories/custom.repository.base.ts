/* tslint:disable no-any */
import {
  DataObject,
  DefaultCrudRepository,
  Filter,
  juggler,
  Where,
} from '@loopback/repository';
import {Count} from '@loopback/repository/src/common-types';
import {Options} from 'loopback-datasource-juggler';
import {BaseEntity} from '../models';

export abstract class CustomRepository<
  T extends BaseEntity,
  ID,
  Relations extends object = {},
> extends DefaultCrudRepository<T, ID, Relations> {
  constructor(
    entityClass: typeof BaseEntity & {
      prototype: T;
    },
    dataSource: juggler.DataSource,
  ) {
    super(entityClass, dataSource);
  }

  // async entityToData<R extends T>(entity: R | DataObject<R>, options?: {} ){
  //   const data = await super.entityToData(entity, options);
  //   (data as BaseEntity).updatedBy = this.currentUser?.name ?? 'loopback';
  //   return data
  // }

  // @inject(AuthenticationBindings.CURRENT_USER)
  // public currentUser?: UserProfile;

  find(filter?: Filter<T>, options?: Options): Promise<(T & Relations)[]> {
    // Filter out soft deleted entries
    filter = filter || {};
    filter.where = filter.where || {};
    (filter.where as any).deleted = false;

    // Now call super
    return super.find(filter, options);
  }

  findOne(
    filter?: Filter<T>,
    options?: Options,
  ): Promise<(T & Relations) | null> {
    // Filter out soft deleted entries
    filter = filter || {};
    filter.where = filter.where || {};
    (filter.where as any).deleted = false;

    // Now call super
    return super.findOne(filter, options);
  }

  findById(
    id: ID,
    filter?: Filter<T>,
    options?: Options,
  ): Promise<T & Relations> {
    // Filter out soft deleted entries
    filter = filter || {};
    filter.where = filter.where || {};
    (filter.where as any).deleted = false;

    // Now call super
    return super.findById(id, filter, options);
  }

  async create(data: DataObject<T>, options?: Options | undefined): Promise<T> {
    return super.create(data, options);
  }

  async updateById(
    id: ID,
    data: DataObject<T>,
    options?: Options,
  ): Promise<void> {
    return super.updateById(id, data, options);
  }

  updateAll(
    data: DataObject<T>,
    where?: Where<T>,
    options?: Options,
  ): Promise<Count> {
    // Filter out soft deleted entries
    where = where || {};
    (where as any).deleted = false;

    // Now call super
    return super.updateAll(data, where, options);
  }

  count(where?: Where<T>, options?: Options): Promise<Count> {
    // Filter out soft deleted entries
    where = where || {};
    (where as any).deleted = false;

    // Now call super
    return super.count(where, options);
  }

  delete(entity: T, options?: Options): Promise<void> {
    // Do soft delete, no hard delete allowed
    (entity as any).deleted = true;

    return super.update(entity, options);
  }

  async deleteAll(where?: Where<T>, options?: Options): Promise<Count> {
    // Do soft delete, no hard delete allowed
    return this.updateAll(
      {
        deleted: true,
      } as any,
      where,
      options,
    );
  }

  async deleteById(id: ID, options?: Options): Promise<void> {
    // Do soft delete, no hard delete allowed

    const data = {
      deleted: true,
    };

    return super.updateById(id, data, options);
  }

  /**
   * Method to perform hard delete of entries. Take caution.
   * @param entity
   * @param options
   */
  deleteHard(entity: T, options?: Options): Promise<void> {
    // Do hard delete
    return super.delete(entity, options);
  }

  /**
   * Method to perform hard delete of entries. Take caution.
   * @param entity
   * @param options
   */
  deleteAllHard(where?: Where<T>, options?: Options): Promise<Count> {
    // Do hard delete
    return super.deleteAll(where, options);
  }

  /**
   * Method to perform hard delete of entries. Take caution.
   * @param entity
   * @param options
   */
  deleteByIdHard(id: ID, options?: Options): Promise<void> {
    // Do hard delete
    return super.deleteById(id, options);
  }
}
