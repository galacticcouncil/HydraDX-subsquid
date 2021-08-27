import {
  BaseModel,
  BooleanField,
  DateField,
  FloatField,
  IntField,
  NumericField,
  JSONField,
  BytesField,
  EnumField,
  StringField,
  ObjectType,
} from '@subsquid/warthog';
import BN from 'bn.js';
import { InputType, Field } from 'type-graphql';

@InputType('DirectTradeFeeInput')
@ObjectType()
export class DirectTradeFee {
  @StringField({})
  accountIdWho!: string;

  @StringField({})
  accountIdTo!: string;

  @StringField({})
  assetId!: string;

  @NumericField({
    nullable: true,
  })
  amount?: BN;
}
