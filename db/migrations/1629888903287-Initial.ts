import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1629888903287 implements MigrationInterface {
    name = 'Initial1629888903287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "asset_price_in_time" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "timestamp" numeric NOT NULL, "price" numeric, CONSTRAINT "PK_821395849225946f14a88c068e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "asset_price" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "token_zero_id" character varying, "token_one_id" character varying, "pair_name" character varying NOT NULL, "prices_id" character varying, CONSTRAINT "PK_66aefc74194b50b3f97e6a1ad8d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trade_transfer" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "timestamp" numeric NOT NULL, "block" character varying NOT NULL, "swap_action_id" character varying NOT NULL, "account_received_id" character varying NOT NULL, "account_sent_id" character varying NOT NULL, "amount_received" numeric, "amount_sent" numeric, CONSTRAINT "PK_b1a0e68bf0289007b1ab421a88f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "swap_action" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "timestamp" TIMESTAMP NOT NULL, "block" character varying NOT NULL, "intention_type" character varying NOT NULL, "slippage" numeric, "fees" jsonb, "total_fee_final" numeric, "match" numeric, "total_direct_trade_exchanged" numeric, "saved" numeric, "initiated_by_account_id" character varying NOT NULL, "token_zero_id" character varying, "token_one_id" character varying, "amount" numeric, "amount_xyk_trade" numeric, "amount_out_xyk_trade" numeric, "amount_sold_bought" numeric, "total_amount_final" numeric, "assets_pair" character varying, "xyk_trade_pool_id" character varying, CONSTRAINT "PK_b0a467555966225698cb6ec7d8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "token" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "decimal" integer NOT NULL, "name" character varying NOT NULL, "shared" boolean NOT NULL, "parent_pool_id" character varying, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pool_asset_volume" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "pool_id" character varying NOT NULL, "timestamp" numeric NOT NULL, "token_zero_amount" numeric, "token_one_amount" numeric, "shared_asset_amount" numeric, "market_cap" numeric, "trade_amount" numeric, CONSTRAINT "PK_417bcf310c9a1f079684b4988c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pool" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "spec_version" character varying, "is_active" boolean NOT NULL, "shared_token_id" character varying, "shared_asset_initial_balance" numeric, "owner_account_id" character varying, "token_zero_id" character varying NOT NULL, "token_one_id" character varying NOT NULL, CONSTRAINT "PK_db1bfe411e1516c01120b85f8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "spec_version" integer, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "no_bond_record_account" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "first_reward_at" integer NOT NULL, CONSTRAINT "PK_547e29f031b2605875d1705f4a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "staking_reward" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "address" character varying NOT NULL, "balance" numeric NOT NULL, "date" TIMESTAMP NOT NULL, CONSTRAINT "PK_63b6754f195dbb71232f598485b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "staking_slash" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "address" character varying NOT NULL, "balance" numeric NOT NULL, "date" TIMESTAMP NOT NULL, CONSTRAINT "PK_3e74c2a899ae0f904f4142a4d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sum_reward" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "account_reward" numeric NOT NULL, "account_slash" numeric NOT NULL, "account_total" numeric NOT NULL, CONSTRAINT "PK_b2d0e49d114fbf29b6bed61e262" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "asset_price" ADD CONSTRAINT "FK_ae42b7b4984f284a03f45ea4e0d" FOREIGN KEY ("token_zero_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asset_price" ADD CONSTRAINT "FK_5d28a135d40ad1fc3ccc1df2857" FOREIGN KEY ("token_one_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asset_price" ADD CONSTRAINT "FK_1d25685e2b9f004e68fa871a473" FOREIGN KEY ("prices_id") REFERENCES "asset_price_in_time"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trade_transfer" ADD CONSTRAINT "FK_9906dafc434dde23f580d4bd6ca" FOREIGN KEY ("swap_action_id") REFERENCES "swap_action"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trade_transfer" ADD CONSTRAINT "FK_3aa33f072776ce20439a6447fa8" FOREIGN KEY ("account_received_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trade_transfer" ADD CONSTRAINT "FK_12d87b31e6a181778dbf2d8f82d" FOREIGN KEY ("account_sent_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "swap_action" ADD CONSTRAINT "FK_29648fde232922e1456a49564fb" FOREIGN KEY ("initiated_by_account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "swap_action" ADD CONSTRAINT "FK_b12d4d11db731dff4650ea1035c" FOREIGN KEY ("token_zero_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "swap_action" ADD CONSTRAINT "FK_bae140ba91a8cfed1651bbcb3f6" FOREIGN KEY ("token_one_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "swap_action" ADD CONSTRAINT "FK_cfd5912e4b2139c0709b3e9db66" FOREIGN KEY ("xyk_trade_pool_id") REFERENCES "pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_10a9626c09f088e1ab761daeb8a" FOREIGN KEY ("parent_pool_id") REFERENCES "pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pool_asset_volume" ADD CONSTRAINT "FK_40a3517b268db93c4349cf7746d" FOREIGN KEY ("pool_id") REFERENCES "pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pool" ADD CONSTRAINT "FK_78a5bc9fc62ec516a95ead4415f" FOREIGN KEY ("shared_token_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pool" ADD CONSTRAINT "FK_d5524dadfee068fca195465fa2a" FOREIGN KEY ("owner_account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pool" ADD CONSTRAINT "FK_86590df140cdf65ba1afb1aeaea" FOREIGN KEY ("token_zero_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pool" ADD CONSTRAINT "FK_e34fce7c59b32f7d554cf4201c3" FOREIGN KEY ("token_one_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pool" DROP CONSTRAINT "FK_e34fce7c59b32f7d554cf4201c3"`);
        await queryRunner.query(`ALTER TABLE "pool" DROP CONSTRAINT "FK_86590df140cdf65ba1afb1aeaea"`);
        await queryRunner.query(`ALTER TABLE "pool" DROP CONSTRAINT "FK_d5524dadfee068fca195465fa2a"`);
        await queryRunner.query(`ALTER TABLE "pool" DROP CONSTRAINT "FK_78a5bc9fc62ec516a95ead4415f"`);
        await queryRunner.query(`ALTER TABLE "pool_asset_volume" DROP CONSTRAINT "FK_40a3517b268db93c4349cf7746d"`);
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_10a9626c09f088e1ab761daeb8a"`);
        await queryRunner.query(`ALTER TABLE "swap_action" DROP CONSTRAINT "FK_cfd5912e4b2139c0709b3e9db66"`);
        await queryRunner.query(`ALTER TABLE "swap_action" DROP CONSTRAINT "FK_bae140ba91a8cfed1651bbcb3f6"`);
        await queryRunner.query(`ALTER TABLE "swap_action" DROP CONSTRAINT "FK_b12d4d11db731dff4650ea1035c"`);
        await queryRunner.query(`ALTER TABLE "swap_action" DROP CONSTRAINT "FK_29648fde232922e1456a49564fb"`);
        await queryRunner.query(`ALTER TABLE "trade_transfer" DROP CONSTRAINT "FK_12d87b31e6a181778dbf2d8f82d"`);
        await queryRunner.query(`ALTER TABLE "trade_transfer" DROP CONSTRAINT "FK_3aa33f072776ce20439a6447fa8"`);
        await queryRunner.query(`ALTER TABLE "trade_transfer" DROP CONSTRAINT "FK_9906dafc434dde23f580d4bd6ca"`);
        await queryRunner.query(`ALTER TABLE "asset_price" DROP CONSTRAINT "FK_1d25685e2b9f004e68fa871a473"`);
        await queryRunner.query(`ALTER TABLE "asset_price" DROP CONSTRAINT "FK_5d28a135d40ad1fc3ccc1df2857"`);
        await queryRunner.query(`ALTER TABLE "asset_price" DROP CONSTRAINT "FK_ae42b7b4984f284a03f45ea4e0d"`);
        await queryRunner.query(`DROP TABLE "sum_reward"`);
        await queryRunner.query(`DROP TABLE "staking_slash"`);
        await queryRunner.query(`DROP TABLE "staking_reward"`);
        await queryRunner.query(`DROP TABLE "no_bond_record_account"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "pool"`);
        await queryRunner.query(`DROP TABLE "pool_asset_volume"`);
        await queryRunner.query(`DROP TABLE "token"`);
        await queryRunner.query(`DROP TABLE "swap_action"`);
        await queryRunner.query(`DROP TABLE "trade_transfer"`);
        await queryRunner.query(`DROP TABLE "asset_price"`);
        await queryRunner.query(`DROP TABLE "asset_price_in_time"`);
    }

}
