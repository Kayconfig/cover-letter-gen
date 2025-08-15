import { State } from '../annotation-state';
import { MIN_PERCENT_MATCH } from '../constants';

export async function outputParser(state: State) {
  const header = '# RESULTS';
  // default output
  let output = `${header}\n\n## Impressive points:\n${state.jobMatchReason}\n\n\n## Areas of improvment:\n${state.resumeImprovements}\n\n\n## Cover Letter:${state.coverLetter}`;

  if (state.jobMatchPercent < MIN_PERCENT_MATCH) {
    output = `${header}\n\n## Impressive points:\n${state.jobMatchReason}\n\nHowever your resume is not a good fit for the job for the following reasons\n${state.jobMisMatchReason}
    `;
  }

  // output is presented as markdown file
  return {
    output,
  };
}
