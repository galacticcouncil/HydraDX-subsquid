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

  @StringField({})
  amount!: string;
}

@InputType('SwapActionFeesInput')
@ObjectType()
export class SwapActionFees {
  @Field(() => [DirectTradeFee], { nullable: true })
  directTrade?: DirectTradeFee[];
}

@InputType('SwapActionMetadataInput')
@ObjectType()
export class SwapActionMetadata {
  @Field(() => [SwapEventMeta], { nullable: true })
  eventsMeta?: SwapEventMeta[];
}

@InputType('SwapEventMetaInput')
@ObjectType()
export class SwapEventMeta {
  @StringField({})
  section!: string;

  @StringField({})
  method!: string;

  @StringField({})
  dispatchInfo!: string;
}
