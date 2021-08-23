import { BaseModel, NumericField, DateTimeField, Model, StringField, JSONField } from '@subsquid/warthog';

import BN from 'bn.js';

import * as jsonTypes from '../jsonfields/jsonfields.model';

@Model({ api: {} })
export class StakingSlash extends BaseModel {
  @StringField({})
  address!: string;

  @NumericField({
    transformer: {
      to: (entityValue: BN) => (entityValue !== undefined ? entityValue.toString(10) : null),
      from: (dbValue: string) =>
        dbValue !== undefined && dbValue !== null && dbValue.length > 0 ? new BN(dbValue, 10) : undefined,
    },
  })
  balance!: BN;

  @DateTimeField({})
  date!: Date;

  constructor(init?: Partial<StakingSlash>) {
    super();
    Object.assign(this, init);
  }
}
