import 'dotenv';
import { program } from 'commander';
import { cliSchema } from './schema';
import { StateGraph } from '@langchain/langgraph';
import { AnnotationState, State } from './annotation-state';
import { resumeParser } from './resume/resume-parser';
import { jobDescriptionParser } from './job-description/jd-parser';
import { jobFitAggregator } from './job-fit/job-fit-aggregator';
import { writeFile } from 'node:fs/promises';
import { shouldContinueAfterJobFitAnalysis } from './should-continue-after-job-fit';
import { generateResumeImprovements } from './improvements/resume-improvements';
import { outputParser } from './output-parser/output-parser';
import { coverLetterGenerator } from './conver-letter/cover-letter-generator';
import chalk from 'chalk';

interface StartGraphInput {
  resumePath: string;
  jobPath: string;
  verbose: boolean;
  outputFilePath: string;
}

async function startGraph({
  resumePath,
  jobPath,
  verbose,
  outputFilePath,
}: StartGraphInput) {
  const chain = new StateGraph(AnnotationState)
    .addNode('resumeParser', resumeParser)
    .addNode('jdParser', jobDescriptionParser)
    .addNode('jobFitAggregator', jobFitAggregator)
    .addNode('generateResumeImprovements', generateResumeImprovements)
    .addNode('coverLetterGenerator', coverLetterGenerator)
    .addNode('outputParser', outputParser)
    .addNode('resumeImprovementAndCoverLetterGenerator', () => ({}))
    .addEdge('__start__', 'resumeParser')
    .addEdge('__start__', 'jdParser')
    .addEdge('resumeParser', 'jobFitAggregator')
    .addEdge('jdParser', 'jobFitAggregator')
    .addConditionalEdges(
      'jobFitAggregator',
      shouldContinueAfterJobFitAnalysis,
      {
        yes: 'resumeImprovementAndCoverLetterGenerator',
        no: 'outputParser',
      }
    )
    .addEdge(
      'resumeImprovementAndCoverLetterGenerator',
      'generateResumeImprovements'
    )
    .addEdge('resumeImprovementAndCoverLetterGenerator', 'coverLetterGenerator')

    .addEdge('generateResumeImprovements', 'outputParser')
    .addEdge('coverLetterGenerator', 'outputParser')

    .addEdge('outputParser', '__end__')

    .compile();

  const res = await chain.invoke({ resumePath, jobPath, verbose });
  await writeFile(outputFilePath, res.output, { encoding: 'utf-8' });
  console.log(res.output);
}

// Set up the command-line interface
program
  .version('1.0.0')
  .description(
    'Give it a Resume file path and a Job posting file path → you get a polished cover letter + feedback on your résumé in '
  )
  .option('--resume <resume-file-path>', 'filepath of the resume')
  .option('--job <job-file-path>', 'filepath of the job description')
  .option(
    '--output <output-file-path>',
    'filepath to save the result i.e output is in markdown format '
  )
  .option('--verbose <verbose>', 'verbose mode for llm', 'false')
  .option('--temperature <temperature>', 'temperature of the llm', '0.7')

  .action(async (options) => {
    const parsedOptionsResult = await cliSchema.safeParseAsync(options);
    if (!parsedOptionsResult.success) {
      const errMsg = parsedOptionsResult.error.issues[0]?.message;
      console.log(chalk.red(`\nError occurred: ${errMsg} \n\n`));
      program.help({ error: true });
      return;
    }

    const parsedOptions = parsedOptionsResult.data;
    await startGraph({
      resumePath: parsedOptions.resume,
      jobPath: parsedOptions.job,
      verbose: parsedOptions.verbose,
      outputFilePath: parsedOptions.output,
    });
  });

// Parse command-line arguments
program.parse(process.argv);
