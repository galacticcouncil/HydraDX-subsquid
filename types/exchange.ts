import { createTypeUnsafe } from "@polkadot/types/create";
import { SubstrateEvent, SubstrateExtrinsic } from "@subsquid/hydra-common";
import { Codec } from "@polkadot/types/types";
import { typeRegistry } from ".";

import {
  AccountId,
  AssetId,
  Balance,
  DispatchError,
} from "@polkadot/types/interfaces";
import { AssetPair, IntentionId, IntentionType } from "../chain";

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

  export class IntentionResolvedAMMTradeEvent {
    public readonly expectedParamTypes = [
      "T::AccountId",
      "IntentionType",
      "IntentionId<T>",
      "Balance",
      "Balance",
    ];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [AccountId, IntentionType, IntentionId, Balance, Balance] {
      return [
        createTypeUnsafe<AccountId & Codec>(typeRegistry, "AccountId", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe<IntentionType & Codec>(typeRegistry, "IntentionType", [
          this.ctx.params[1].value,
        ]),
        createTypeUnsafe<IntentionId & Codec>(typeRegistry, "IntentionId", [
          this.ctx.params[2].value,
        ]),
        createTypeUnsafe<Balance & Codec>(typeRegistry, "Balance", [
          this.ctx.params[3].value,
        ]),
        createTypeUnsafe<Balance & Codec>(typeRegistry, "Balance", [
          this.ctx.params[4].value,
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

  export class IntentionResolvedDirectTradeEvent {
    public readonly expectedParamTypes = [
      "T::AccountId",
      "T::AccountId",
      "IntentionId<T>",
      "IntentionId<T>",
      "Balance",
      "Balance",
    ];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [
      AccountId,
      AccountId,
      IntentionId,
      IntentionId,
      Balance,
      Balance
    ] {
      return [
        createTypeUnsafe<AccountId & Codec>(typeRegistry, "AccountId", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe<AccountId & Codec>(typeRegistry, "AccountId", [
          this.ctx.params[1].value,
        ]),
        createTypeUnsafe<IntentionId & Codec>(typeRegistry, "IntentionId", [
          this.ctx.params[2].value,
        ]),
        createTypeUnsafe<IntentionId & Codec>(typeRegistry, "IntentionId", [
          this.ctx.params[3].value,
        ]),
        createTypeUnsafe<Balance & Codec>(typeRegistry, "Balance", [
          this.ctx.params[4].value,
        ]),
        createTypeUnsafe<Balance & Codec>(typeRegistry, "Balance", [
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

  export class IntentionResolvedDirectTradeFeesEvent {
    public readonly expectedParamTypes = [
      "T::AccountId",
      "IntentionId<T>",
      "T::AccountId",
      "AssetId",
      "Balance",
    ];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [AccountId, IntentionId, AccountId, AssetId, Balance] {
      return [
        createTypeUnsafe<AccountId & Codec>(typeRegistry, "AccountId", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe<IntentionId & Codec>(typeRegistry, "IntentionId", [
          this.ctx.params[1].value,
        ]),
        createTypeUnsafe<AccountId & Codec>(typeRegistry, "AccountId", [
          this.ctx.params[2].value,
        ]),
        createTypeUnsafe<AssetId & Codec>(typeRegistry, "AssetId", [
          this.ctx.params[3].value,
        ]),
        createTypeUnsafe<Balance & Codec>(typeRegistry, "Balance", [
          this.ctx.params[4].value,
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

  export class IntentionResolveErrorEventEvent {
    public readonly expectedParamTypes = [
      "T::AccountId",
      "AssetPair",
      "IntentionType",
      "IntentionId<T>",
      "dispatch::DispatchError",
    ];

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [
      AccountId,
      AssetPair,
      IntentionType,
      IntentionId,
      DispatchError
    ] {
      return [
        createTypeUnsafe<AccountId & Codec>(typeRegistry, "AccountId", [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe<AssetPair & Codec>(typeRegistry, "AssetPair", [
          this.ctx.params[1].value,
        ]),
        createTypeUnsafe<IntentionType & Codec>(typeRegistry, "IntentionType", [
          this.ctx.params[2].value,
        ]),
        createTypeUnsafe<IntentionId & Codec>(typeRegistry, "IntentionId", [
          this.ctx.params[3].value,
        ]),
        createTypeUnsafe<DispatchError & Codec>(typeRegistry, "DispatchError", [
          this.ctx.params[4].value,
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
