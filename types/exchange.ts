import { createTypeUnsafe } from "@polkadot/types/create";
import { SubstrateEvent, SubstrateExtrinsic } from "@subsquid/hydra-common";
import { Codec } from "@polkadot/types/types";
import { typeRegistry } from ".";

import { AccountId, AssetId, Balance } from "@polkadot/types/interfaces";
import { IntentionId, IntentionType } from "../chain";

export namespace Exchange {
  export class IntentionRegisteredEvent {
    public readonly expectedParamTypes = [
      "T::AccountId",
      "AssetId",
      "AssetId",
      "Balance",
      "IntentionType",
      "IntentionId<T>",
    ];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [
      AccountId,
      AssetId,
      AssetId,
      Balance,
      IntentionType,
      IntentionId
    ] {
      return [
        createTypeUnsafe<AccountId & Codec>(typeRegistry, "AccountId", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe<AssetId & Codec>(typeRegistry, "AssetId", [
          this.ctx.params[1].value,
        ]),
        createTypeUnsafe<AssetId & Codec>(typeRegistry, "AssetId", [
          this.ctx.params[2].value,
        ]),
        createTypeUnsafe<Balance & Codec>(typeRegistry, "Balance", [
          this.ctx.params[3].value,
        ]),
        createTypeUnsafe<IntentionType & Codec>(typeRegistry, "IntentionType", [
          this.ctx.params[4].value,
        ]),
        createTypeUnsafe<IntentionId & Codec>(typeRegistry, "IntentionId", [
          this.ctx.params[5].value,
        ]),
      ];
    }

    validateParams(): boolean {
      if (this.expectedParamTypes.length !== this.ctx.params.length) {
        return false;
      }
      let valid = true;
      this.expectedParamTypes.forEach((type, i) => {
        if (type !== this.ctx.params[i].type) {
          valid = false;
        }
      });
      return valid;
    }
  }
}
