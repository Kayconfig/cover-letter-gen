import { AIMessageChunk, BaseMessage } from '@langchain/core/messages';
import { InvokableLLM } from '../interfaces/invokable-llm';
import { AggregateJobFitState } from './interface/aggregate-jobfit';
import { aggregateJobFit } from './job-fit-aggregator';
import { createAIMsgChunk } from '../utils/create-ai-message-chunk';
import { JobfitMeta } from './interface/job-fit-meta';

describe('aggregateJobFit', () => {
  it('should return correct result', async () => {
    const mockScore = 65;
    const mockMatchReason = 'You know how to write code';
    const mockMisMatchReason = "You don't understand c#";

    const mockedJobFitMeta: JobfitMeta = {
      score: mockScore,
      matchReason: mockMatchReason,
      misMatchReason: mockMisMatchReason,
    };
    const want = {
      jobMatchPercent: mockScore,
      jobMatchReason: mockMatchReason,
      jobMisMatchReason: mockMisMatchReason,
    };
    const mockState: AggregateJobFitState = {
      parsedJobDescription: 'mock description',
      parsedResume: 'mock resume',
    };
    const mockLLM: InvokableLLM = {
      invoke: jest
        .fn()
        .mockImplementation(
          async (msgs: Array<BaseMessage>): Promise<AIMessageChunk> => {
            expect(msgs.length).toBeGreaterThanOrEqual(1);
            return createAIMsgChunk(JSON.stringify(mockedJobFitMeta));
          }
        ),
    };

    const got = await aggregateJobFit(mockState, mockLLM);
    expect(got).toEqual(want);
  });
});
