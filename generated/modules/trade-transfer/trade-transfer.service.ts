import { Service, Inject } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { WhereInput, HydraBaseService } from '@subsquid/warthog';

import { TradeTransfer } from './trade-transfer.model';

import { TradeTransferWhereArgs, TradeTransferWhereInput } from '../../warthog';

import { SwapAction } from '../swap-action/swap-action.model';
import { SwapActionService } from '../swap-action/swap-action.service';
import { Account } from '../account/account.model';
import { AccountService } from '../account/account.service';
import { getConnection, getRepository, In, Not } from 'typeorm';
import _ from 'lodash';

@Service('TradeTransferService')
export class TradeTransferService extends HydraBaseService<TradeTransfer> {
  @Inject('SwapActionService')
  public readonly swapActionService!: SwapActionService;
  @Inject('AccountService')
  public readonly accountReceivedService!: AccountService;
  @Inject('AccountService')
  public readonly accountSentService!: AccountService;

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

  async findWithRelations<W extends WhereInput>(
    _where?: any,
    orderBy?: string | string[],
    limit?: number,
    offset?: number,
    fields?: string[]
  ): Promise<TradeTransfer[]> {
    const where = <TradeTransferWhereInput>(_where || {});

    // remove relation filters to enable warthog query builders
    const { swapAction } = where;
    delete where.swapAction;

    // remove relation filters to enable warthog query builders
    const { accountReceived } = where;
    delete where.accountReceived;

    // remove relation filters to enable warthog query builders
    const { accountSent } = where;
    delete where.accountSent;

    let mainQuery = this.buildFindQueryWithParams(<any>where, orderBy, undefined, fields, 'main').take(undefined); // remove LIMIT

    let parameters = mainQuery.getParameters();

    if (swapAction) {
      // OTO or MTO
      const swapActionQuery = this.swapActionService
        .buildFindQueryWithParams(<any>swapAction, undefined, undefined, ['id'], 'swapAction')
        .take(undefined); // remove the default LIMIT

      mainQuery = mainQuery.andWhere(`"tradetransfer"."swap_action_id" IN (${swapActionQuery.getQuery()})`);

      parameters = { ...parameters, ...swapActionQuery.getParameters() };
    }

    if (accountReceived) {
      // OTO or MTO
      const accountReceivedQuery = this.accountReceivedService
        .buildFindQueryWithParams(<any>accountReceived, undefined, undefined, ['id'], 'accountReceived')
        .take(undefined); // remove the default LIMIT

      mainQuery = mainQuery.andWhere(`"tradetransfer"."account_received_id" IN (${accountReceivedQuery.getQuery()})`);

      parameters = { ...parameters, ...accountReceivedQuery.getParameters() };
    }

    if (accountSent) {
      // OTO or MTO
      const accountSentQuery = this.accountSentService
        .buildFindQueryWithParams(<any>accountSent, undefined, undefined, ['id'], 'accountSent')
        .take(undefined); // remove the default LIMIT

      mainQuery = mainQuery.andWhere(`"tradetransfer"."account_sent_id" IN (${accountSentQuery.getQuery()})`);

      parameters = { ...parameters, ...accountSentQuery.getParameters() };
    }

    mainQuery = mainQuery.setParameters(parameters);

    return mainQuery
      .take(limit || 50)
      .skip(offset || 0)
      .getMany();
  }
}
