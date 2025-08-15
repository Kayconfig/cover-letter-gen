import { InvokableLLM } from '../interfaces/invokable-llm';
import { BaseMessage } from '@langchain/core/messages';
import { createAIMsgChunk } from '../utils/create-ai-message-chunk';
import { GenerateCoverLetterState } from './interfaces/generate-cover-letter-state';
import { generateCoverLetter } from './cover-letter-generator';

describe('generateCoverLetter', () => {
  it('should return correct result', async () => {
    const mockParsedJobDescription = JSON.stringify({
      about: 'MOCK COMPANY LLC',
      description: 'this company is looking for backend dev',
    });
    const mockParsedResume = JSON.stringify({
      name: 'John Doe',
      expertise: 'Microservices and Queues',
    });

    const expectedAIResponseContent = 'This is the cover-letter';
    const expectedAiResponse = createAIMsgChunk(expectedAIResponseContent);

    const mockedLLM: InvokableLLM = {
      invoke: jest.fn().mockImplementation(async (msgs: Array<BaseMessage>) => {
        expect(msgs.length).toBeGreaterThanOrEqual(1);
        return expectedAiResponse;
      }),
    };

    const state: GenerateCoverLetterState = {
      parsedJobDescription: mockParsedJobDescription,
      parsedResume: mockParsedResume,
    };
    const want = { coverLetter: expectedAIResponseContent };

    const got = await generateCoverLetter(state, mockedLLM);

    expect(got).toEqual(want);
  });
});
