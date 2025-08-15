import { State } from '../annotation-state';
import { MIN_PERCENT_MATCH } from '../constants';

export function shouldContinueAfterJobFitAnalysis(state: State) {
  if (state.jobMatchPercent < MIN_PERCENT_MATCH) {
    return 'no';
  }
  return 'yes';
}
