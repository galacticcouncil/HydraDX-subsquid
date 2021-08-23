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
  @StringField({
    nullable: true,
  })
  account1?: string;

  @StringField({
    nullable: true,
  })
  account2?: string;

  @StringField({
    nullable: true,
  })
  asset?: string;

  @NumericField({
    nullable: true,
  })
  amount?: BN;
}
