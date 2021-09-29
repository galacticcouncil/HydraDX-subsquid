type HydraDXEvents = {
  intentionRegistered: string;
  intentionResolvedAMMTrade: string;
  intentionResolvedDirectTrade: string;
  intentionResolvedDirectTradeFees: string;
  intentionResolveErrorEvent: string;
};

export const hydraDXEvents: HydraDXEvents = {
  intentionRegistered: 'IntentionRegistered',
  intentionResolvedAMMTrade: 'IntentionResolvedAMMTrade',
  intentionResolvedDirectTrade: 'IntentionResolvedDirectTrade',
  intentionResolvedDirectTradeFees: 'IntentionResolvedDirectTradeFees',
  intentionResolveErrorEvent: 'IntentionResolveErrorEvent',
};
