import {AggregateResult} from '../../src/types';

type Aggregate = Omit<AggregateResult, 'statType'>;

export default function generateAggregate(): Aggregate {
  return {
    bounce_rate: {value: 0.6},
    pageviews: {value: 3500},
    visit_duration: {value: 186},
    visitors: {value: 1300},
  };
}
