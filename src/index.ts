import { config } from 'dotenv';
import { program } from 'commander';
import { z } from 'zod';

config();

const cliSchema = z.object({
  resume: z.string({ error: `'--resume' is required` }),
  job: z.string({ error: `'--job' is required` }),
  output: z.string({ error: `'--output' is required` }),
  verbose: z
    .stringbool({
      error: `'--verbose' should be 'true' or 'false'`,
    })
    .optional(),
  temperature: z
    .string({
      error: `'--temperature' should be a valid value e.g 0.5 , ranging from 0 - 1`,
    })
    .transform((numString, ctx) => {
      const parsedNumber = Number(numString);
      if (isNaN(parsedNumber)) {
        ctx.addIssue({
          message: `'--temperature' should be a valid value e.g 0.2, 0.5, e.t.c ranging from 0 to 1`,
          code: 'invalid_value',
          values: [],
        });
        return z.NEVER;
      }
      return parsedNumber;
    })

    .optional(),
});

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
  .option('--verbose <verbose>', 'llm should be verbose', 'false')
  .option('--temperature <temperature>', 'temperature of the llm', '0.7')

  .action(async (options) => {
    console.log({ options });
    const parsedOptionsResult = await cliSchema.safeParseAsync(options);
    if (!parsedOptionsResult.success) {
      const errMsg = parsedOptionsResult.error.issues[0]?.message;
      console.error(`\n\!!! ERROR: ${errMsg} !!!\n\n`);
      program.help();
      return;
    }

    const parsedOptions = parsedOptionsResult.data;

    console.log('Hello world');
    console.log({ parsedOptions });
  });

// Parse command-line arguments
program.parse(process.argv);
