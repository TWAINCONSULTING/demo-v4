import { helpArticles } from '../data/helpArticles';

export const findBestMatch = (input: string): string | null => {
  const normalizedInput = input.toLowerCase().trim();
  
  // Check help articles for matches
  for (const article of helpArticles) {
    // Check if input matches article title or content
    if (
      normalizedInput.includes(article.title.toLowerCase()) ||
      article.content.toLowerCase().includes(normalizedInput)
    ) {
      return article.content;
    }
  }
  
  // No match found
  return 'Beklager, jeg fant ikke noe svar på spørsmålet ditt. Prøv å omformulere spørsmålet eller kontakt styret for mer hjelp.';
};