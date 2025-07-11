'use server';

import { answerIPv6Questions, type AnswerIPv6QuestionsInput } from '@/ai/flows/answer-ipv6-questions';

export async function askQuestionAction(input: AnswerIPv6QuestionsInput) {
  try {
    const result = await answerIPv6Questions(input);
    return { success: true, answer: result.answer };
  } catch (error) {
    console.error('Error in AI action:', error);
    return { success: false, error: 'Sorry, I encountered an issue while processing your question. Please try again later.' };
  }
}
