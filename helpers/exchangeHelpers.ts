import BN from 'bn.js';
import { SwapAction } from '../generated/model';
import appConstants from '../variables';

/**
 * Function mutates received SwapAction data and returns already updated values.
 * @param rawData: SwapAction
 * @param method: string
 */
export const calculateSwapActionValues = (
  rawData: SwapAction,
  method: string
): SwapAction => {
  const updatedData = rawData;

  /**
   * Calculate "match" value - total amount, which has been matched by Direct trade
   */
  if (
    method === appConstants.chain.hydraDXEvents.intentionResolvedDirectTrade &&
    rawData.directTrades !== undefined
  ) {
    let totalDirectTradeMatch = new BN(0);
    let totalDirectTradeExchanged = new BN(0);

    rawData.directTrades.forEach(item => {
      if (rawData.intentionType === 'BUY') {
        totalDirectTradeMatch = totalDirectTradeMatch.add(
          item.amountReceived || new BN(0)
        );
        totalDirectTradeExchanged = totalDirectTradeExchanged.add(
          item.amountSent || new BN(0)
        );
      } else {
        totalDirectTradeMatch = totalDirectTradeMatch.add(
          item.amountSent || new BN(0)
        );
        totalDirectTradeExchanged = totalDirectTradeExchanged.add(
          item.amountReceived || new BN(0)
        );
      }
    });
    updatedData.match = totalDirectTradeMatch;
    updatedData.totalDirectTradeExchanged = totalDirectTradeExchanged;

    console.log('totalDirectTradeMatch - ', totalDirectTradeMatch.toString());
    console.log(
      'totalDirectTradeExchanged - ',
      totalDirectTradeExchanged.toString()
    );
  }

  /**
   * Calculate "totalFeeFinal" - total amount of direct trade fees.
   */
  console.log('>>>rawData.fees - >>> ', rawData.fees);
  if (
    method ===
      appConstants.chain.hydraDXEvents.intentionResolvedDirectTradeFees &&
    rawData.fees.directTrade !== undefined
  ) {
    let totalFeesAmount = new BN(0);
    // @ts-ignore
    rawData.fees.directTrade.forEach((feeItem: any) => {
      totalFeesAmount = totalFeesAmount.add(new BN(feeItem.amount));
    });
    updatedData.totalFeeFinal = totalFeesAmount;
  }

  /**
   * Calculate "totalAmountFinal" - total amount from all types of trading for
   * this specific exchange action +/- fees.
   */

  const totalXykTradeAmount: BN =
    rawData && rawData.amountOutXykTrade !== undefined
      ? rawData.amountOutXykTrade
      : new BN(0);

  const totalDirectTradeAmount: BN =
    rawData.totalDirectTradeExchanged !== undefined
      ? rawData.totalDirectTradeExchanged
      : new BN(0);

  const totalFeeAmount: BN =
    rawData.totalFeeFinal !== undefined ? rawData.totalFeeFinal : new BN(0);

  updatedData.totalAmountFinal = totalXykTradeAmount.add(
    totalDirectTradeAmount
  );

  updatedData.totalAmountFinal =
    rawData.intentionType === 'BUY'
      ? updatedData.totalAmountFinal.add(totalFeeAmount)
      : updatedData.totalAmountFinal.sub(totalFeeAmount);

  return updatedData;
};
