'use server';

/**
 * @fileOverview AI-powered product recommendation flow.
 *
 * - getProductRecommendations - A function that returns product recommendations based on user history.
 * - ProductRecommendationsInput - The input type for the getProductRecommendations function.
 * - ProductRecommendationsOutput - The return type for the getProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationsInputSchema = z.object({
  browsingHistory: z
    .string()
    .describe('A list of product names the user has recently viewed.'),
  pastPurchases: z
    .string()
    .describe('A list of product names the user has previously purchased.'),
  currentCart: z
    .string()
    .optional()
    .describe('A list of product names currently in the user\'s cart.'),
});
export type ProductRecommendationsInput = z.infer<
  typeof ProductRecommendationsInputSchema
>;

const ProductRecommendationsOutputSchema = z.object({
  recommendedProducts: z
    .string()
    .describe('A list of product names recommended for the user.'),
});
export type ProductRecommendationsOutput = z.infer<
  typeof ProductRecommendationsOutputSchema
>;

export async function getProductRecommendations(
  input: ProductRecommendationsInput
): Promise<ProductRecommendationsOutput> {
  return productRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: {schema: ProductRecommendationsInputSchema},
  output: {schema: ProductRecommendationsOutputSchema},
  prompt: `Based on the user's browsing history: {{{browsingHistory}}}, past purchases: {{{pastPurchases}}}, and current cart: {{{currentCart}}}, recommend a list of relevant products. Return only product names in a comma separated list.`,
});

const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationsInputSchema,
    outputSchema: ProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
