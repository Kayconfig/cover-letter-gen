import { config } from 'dotenv';
import { program } from 'commander';
import { cliSchema } from './schema';
import { StateGraph } from '@langchain/langgraph';
import { AnnotationState } from './annotation-state';
import { resumeParser } from './resume/resume-parser';
import { resumeSummarizer } from './resume/resume-summarizer';
import { jobDescriptionParser } from './job-description/jd-parser';
import { jobDescriptionSummarizer } from './job-description/jd-summarizer';
import { jobFitAggregator } from './job-fit/job-fit-aggregator';
import { writeFileSync } from 'node:fs';
config();

interface StartGraphInput {
  resumePath: string;
  jobPath: string;
  verbose: boolean;
}

async function startGraph({ resumePath, jobPath, verbose }: StartGraphInput) {
  const chain = new StateGraph(AnnotationState)
    .addNode('resumeParser', resumeParser)
    .addNode('resumeSummarizer', resumeSummarizer)
    .addNode('jdParser', jobDescriptionParser)
    .addNode('jdSummarizer', jobDescriptionSummarizer)
    .addNode('jobFitAggregator', jobFitAggregator)
    .addEdge('__start__', 'resumeParser')
    .addEdge('__start__', 'jdParser')
    .addEdge('resumeParser', 'jobFitAggregator')
    .addEdge('jdParser', 'jobFitAggregator')
    .addEdge('jobFitAggregator', '__end__')

    .compile();

  const res = await chain.invoke({ resumePath, jobPath, verbose });
  console.log(res);
}

// Set up the command-line interface
program
  .version('1.0.0')
  .description(
    'Give it a résumé file path and a job posting file path → you get a polished cover letter + feedback on your résumé in '
  )
  .option('--resume <resume-file-path>', 'filepath of the resume')
  .option('--job <job-file-path>', 'filepath of the job description')
  .option(
    '--output <cover-letter-file-path>',
    'filepath to save the cover letter'
  )
  .option('--verbose <verbose>', 'verbose mode for llm', 'false')
  .option('--temperature <temperature>', 'temperature of the llm', '0.7')

  .action(async (options) => {
    const parsedOptionsResult = await cliSchema.safeParseAsync(options);
    if (!parsedOptionsResult.success) {
      const errMsg = parsedOptionsResult.error.issues[0]?.message;
      console.error(`\n\!!! ERROR: ${errMsg} !!!\n\n`);
      program.help();
      return;
    }

    const parsedOptions = parsedOptionsResult.data;
    await startGraph({
      resumePath: parsedOptions.resume,
      jobPath: parsedOptions.job,
      verbose: parsedOptions.verbose,
    });
  });

// Parse command-line arguments
program.parse(process.argv);
