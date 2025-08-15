import { z } from 'zod';

export const cliSchema = z.object({
  resume: z.string({ error: `'--resume' is required` }),
  job: z.string({ error: `'--job' is required` }),
  output: z
    .string({ error: `'--output' is required` })
    .endsWith('.md', {
      error: `output filepath must end with '.md', e.g 'output.md'`,
    }),
  verbose: z
    .stringbool({
      error: `'--verbose' should be 'true' or 'false'`,
    })
    .default(false),
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

    .default(0.7),
});
