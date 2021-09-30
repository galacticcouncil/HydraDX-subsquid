import { Service, Inject } from 'typedi';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { WhereInput, HydraBaseService } from '@subsquid/warthog';

import { TradeTransfer } from './trade-transfer.model';

import { TradeTransferWhereArgs, TradeTransferWhereInput } from '../../warthog';

import { SwapAction } from '../swap-action/swap-action.model';
import { SwapActionService } from '../swap-action/swap-action.service';
import { Token } from '../token/token.model';
import { TokenService } from '../token/token.service';
import { Account } from '../account/account.model';
import { AccountService } from '../account/account.service';
import { getConnection, getRepository, In, Not } from 'typeorm';
import _ from 'lodash';

@Service('TradeTransferService')
export class TradeTransferService extends HydraBaseService<TradeTransfer> {
  @Inject('SwapActionService')
  public readonly parentSwapActionService!: SwapActionService;
  @Inject('TokenService')
  public readonly assetSentService!: TokenService;
  @Inject('TokenService')
  public readonly assetReceivedService!: TokenService;
  @Inject('AccountService')
  public readonly accountSentService!: AccountService;
  @Inject('AccountService')
  public readonly accountReceivedService!: AccountService;

  constructor(@InjectRepository(TradeTransfer) protected readonly repository: Repository<TradeTransfer>) {
    super(TradeTransfer, repository);
  }

  async find<W extends WhereInput>(
    where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): Promise<TradeTransfer[]> {
    return this.findWithRelations<W>(where, orderBy, limit, offset, fields);
  }

  findWithRelations<W extends WhereInput>(
    _where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): Promise<TradeTransfer[]> {
    return this.buildFindWithRelationsQuery(_where, orderBy, limit, offset, fields).getMany();
  }

  buildFindWithRelationsQuery<W extends WhereInput>(
    _where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): SelectQueryBuilder<TradeTransfer> {
    const where = <TradeTransferWhereInput>(_where || {});

    // remove relation filters to enable warthog query builders
    const { parentSwapAction } = where;
    delete where.parentSwapAction;

    // remove relation filters to enable warthog query builders
    const { assetSent } = where;
    delete where.assetSent;

    // remove relation filters to enable warthog query builders
    const { assetReceived } = where;
    delete where.assetReceived;

    // remove relation filters to enable warthog query builders
    const { accountSent } = where;
    delete where.accountSent;

    // remove relation filters to enable warthog query builders
    const { accountReceived } = where;
    delete where.accountReceived;

    let mainQuery = this.buildFindQueryWithParams(<any>where, orderBy, undefined, fields, 'main').take(undefined); // remove LIMIT

    let parameters = mainQuery.getParameters();

    if (parentSwapAction) {
      // OTO or MTO
      const parentSwapActionQuery = this.parentSwapActionService
        .buildFindQueryWithParams(<any>parentSwapAction, undefined, undefined, ['id'], 'parentSwapAction')
        .take(undefined); // remove the default LIMIT

      mainQuery = mainQuery.andWhere(
        `"tradetransfer"."parent_swap_action_id" IN (${parentSwapActionQuery.getQuery()})`
      );

      parameters = { ...parameters, ...parentSwapActionQuery.getParameters() };
    }

    if (assetSent) {
      // OTO or MTO
      const assetSentQuery = this.assetSentService
        .buildFindQueryWithParams(<any>assetSent, undefined, undefined, ['id'], 'assetSent')
        .take(undefined); // remove the default LIMIT

      mainQuery = mainQuery.andWhere(`"tradetransfer"."asset_sent_id" IN (${assetSentQuery.getQuery()})`);

      parameters = { ...parameters, ...assetSentQuery.getParameters() };
    }

    if (assetReceived) {
      // OTO or MTO
      const assetReceivedQuery = this.assetReceivedService
        .buildFindQueryWithParams(<any>assetReceived, undefined, undefined, ['id'], 'assetReceived')
        .take(undefined); // remove the default LIMIT

      mainQuery = mainQuery.andWhere(`"tradetransfer"."asset_received_id" IN (${assetReceivedQuery.getQuery()})`);

      parameters = { ...parameters, ...assetReceivedQuery.getParameters() };
    }

    if (accountSent) {
      // OTO or MTO
      const accountSentQuery = this.accountSentService
        .buildFindQueryWithParams(<any>accountSent, undefined, undefined, ['id'], 'accountSent')
        .take(undefined); // remove the default LIMIT

      mainQuery = mainQuery.andWhere(`"tradetransfer"."account_sent_id" IN (${accountSentQuery.getQuery()})`);

      parameters = { ...parameters, ...accountSentQuery.getParameters() };
    }

    if (accountReceived) {
      // OTO or MTO
      const accountReceivedQuery = this.accountReceivedService
        .buildFindQueryWithParams(<any>accountReceived, undefined, undefined, ['id'], 'accountReceived')
        .take(undefined); // remove the default LIMIT

      mainQuery = mainQuery.andWhere(`"tradetransfer"."account_received_id" IN (${accountReceivedQuery.getQuery()})`);

      parameters = { ...parameters, ...accountReceivedQuery.getParameters() };
    }

    mainQuery = mainQuery.setParameters(parameters);

    return mainQuery.take(limit || 50).skip(offset || 0);
  }
}
