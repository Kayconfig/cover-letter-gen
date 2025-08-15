import { BaseMessage } from '@langchain/core/messages';
import { InvokableLLM } from '../interfaces/invokable-llm';
import { SummarizeJobDescription } from './intefaces/summarize-job-description';
import { summarizeJobDescription } from './jd-summarizer';
import { createAIMsgChunk } from '../utils/create-ai-message-chunk';

describe('summarizeJobDescription', () => {
  it('should return correct result', async () => {
    const mockState: SummarizeJobDescription = {
      parsedJobDescription: 'MOCK JOB DESCRIPTION',
    };
    const mockSummarizedJobDescription = 'Mock job description';
    const mockLLM: InvokableLLM = {
      invoke: jest.fn().mockImplementation(async (msgs: Array<BaseMessage>) => {
        expect(msgs.length).toBeGreaterThanOrEqual(1);

        return createAIMsgChunk(mockSummarizedJobDescription);
      }),
    };

    const want = { summarizedJobDescription: mockSummarizedJobDescription };
    const got = await summarizeJobDescription(mockState, mockLLM);

    expect(got).toEqual(want);
  });
});
