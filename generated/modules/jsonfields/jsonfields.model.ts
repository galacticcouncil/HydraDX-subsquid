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

@InputType('SwapActionErrorDetailsInput')
@ObjectType()
export class SwapActionErrorDetails {
  @StringField({
    nullable: true,
  })
  section?: string;

  @StringField({
    nullable: true,
  })
  name?: string;

  @StringField({
    nullable: true,
  })
  documantation?: string;
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
  @BooleanField({
    nullable: true,
  })
  statusReady?: boolean;

  @BooleanField({
    nullable: true,
  })
  statusInBlock?: boolean;

  @BooleanField({
    nullable: true,
  })
  statusFinalized?: boolean;

  @BooleanField({
    nullable: true,
  })
  statusError?: boolean;

  @Field(() => [SwapActionErrorDetails], { nullable: true })
  errorsDetails?: SwapActionErrorDetails[];

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
