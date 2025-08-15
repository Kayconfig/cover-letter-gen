import { BaseMessage } from '@langchain/core/messages';
import { InvokableLLM } from '../interfaces/invokable-llm';
import { GenerateResumeImprovementState } from './interfaces/generate-resume-improvement';
import { generateResumeImprovements } from './resume-improvements';
import { createAIMsgChunk } from '../utils/create-ai-message-chunk';

describe('generateResumeImprovements', () => {
  it('should generate correct result', async () => {
    const mockState: GenerateResumeImprovementState = {
      parsedJobDescription: JSON.stringify({ about: 'description of company' }),
      parsedResume: JSON.stringify({ name: 'John Doe' }),
    };
    const expectedResumeImprovements = 'resume improvments';
    const mockedLLM: InvokableLLM = {
      invoke: jest.fn().mockImplementation(async (msgs: Array<BaseMessage>) => {
        expect(msgs.length).toBeGreaterThanOrEqual(1);
        return createAIMsgChunk(expectedResumeImprovements);
      }),
    };
    const want = { resumeImprovements: expectedResumeImprovements };
    const got = await generateResumeImprovements(mockState, mockedLLM);

    expect(got).toEqual(want);
  });
});
