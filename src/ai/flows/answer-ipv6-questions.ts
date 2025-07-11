// This is an AI-powered assistant that answers user questions about IPv6.
//
// - answerIPv6Questions - A function that answers questions about IPv6.
// - AnswerIPv6QuestionsInput - The input type for the answerIPv6Questions function.
// - AnswerIPv6QuestionsOutput - The return type for the answerIPv6Questions function.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerIPv6QuestionsInputSchema = z.object({
  question: z.string().describe('The question about IPv6 to answer.'),
});
export type AnswerIPv6QuestionsInput = z.infer<typeof AnswerIPv6QuestionsInputSchema>;

const AnswerIPv6QuestionsOutputSchema = z.object({
  answer: z.string().describe('The answer to the question about IPv6.'),
});
export type AnswerIPv6QuestionsOutput = z.infer<typeof AnswerIPv6QuestionsOutputSchema>;

export async function answerIPv6Questions(input: AnswerIPv6QuestionsInput): Promise<AnswerIPv6QuestionsOutput> {
  return answerIPv6QuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerIPv6QuestionsPrompt',
  input: {schema: AnswerIPv6QuestionsInputSchema},
  output: {schema: AnswerIPv6QuestionsOutputSchema},
  prompt: `You are a helpful AI assistant that answers questions about IPv6.

  Answer the following question:

  {{question}}`,
});

const answerIPv6QuestionsFlow = ai.defineFlow(
  {
    name: 'answerIPv6QuestionsFlow',
    inputSchema: AnswerIPv6QuestionsInputSchema,
    outputSchema: AnswerIPv6QuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
