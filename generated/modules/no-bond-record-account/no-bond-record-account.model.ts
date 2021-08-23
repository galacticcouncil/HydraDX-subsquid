import { BaseModel, IntField, Model, StringField, JSONField } from '@subsquid/warthog';

import * as jsonTypes from '../jsonfields/jsonfields.model';

@Model({ api: {} })
export class NoBondRecordAccount extends BaseModel {
  @IntField({})
  firstRewardAt!: number;

  constructor(init?: Partial<NoBondRecordAccount>) {
    super();
    Object.assign(this, init);
  }
}
