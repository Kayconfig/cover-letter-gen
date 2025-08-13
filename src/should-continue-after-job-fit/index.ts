import { State } from '../annotation-state';

export function shouldContinueAfterJobFitAnalysis(state: State) {
  const MIN_PERCENT_MATCH = 65;
  if (state.jobMatchPercent < MIN_PERCENT_MATCH) {
    return 'no';
  }
  return 'yes';
}
