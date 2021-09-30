import { createTypeUnsafe } from "@polkadot/types/create";
import { SubstrateEvent, SubstrateExtrinsic } from "@subsquid/hydra-common";
import { Codec } from "@polkadot/types/types";
import { typeRegistry } from ".";

import { AccountId, AssetId, Balance } from "@polkadot/types/interfaces";

export namespace XYK {
  /**
   *  Pool was created. [who, asset a, asset b, initial shares amount, share token, pool account id]
   *
   *  Event parameters: [T::AccountId, AssetId, AssetId, Balance, AssetId, T::AccountId, ]
   */
  export class PoolCreatedEvent {
    public readonly expectedParamTypes = [
      "T::AccountId",
      "AssetId",
      "AssetId",
      "Balance",
      "AssetId",
      "T::AccountId",
    ];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [AccountId, AssetId, AssetId, Balance, AssetId, AccountId] {
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
        createTypeUnsafe<AssetId & Codec>(typeRegistry, "AssetId", [
          this.ctx.params[4].value,
        ]),
        createTypeUnsafe<AccountId & Codec>(typeRegistry, "AccountId", [
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
