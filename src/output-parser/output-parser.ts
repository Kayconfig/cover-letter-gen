import { State } from '../annotation-state';
import { MIN_PERCENT_MATCH } from '../constants';

export async function outputParser(state: State) {
  const header = '-------------------- RESULT ---------------------';
  if (state.jobMatchPercent < MIN_PERCENT_MATCH) {
    const output = `
    ${header}
    Your resume is impressive in the following ways:
    ${state.jobMatchReason}
        
    However your resume does not seem to be a good fit for the job for the following reasons
    ${state.jobMisMatchReason}
    `;
    return { output };
  }
  return {
    output: `${header}\n\nImpressive points: ${state.jobMatchReason}\n\n\nAreas of improvment:\n${state.resumeImprovements}\n\nCover Letter:${state.coverLetter}`,
  };
}
