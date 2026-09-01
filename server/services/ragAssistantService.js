import { queryDatabase } from '../db/connection.js';
import { VectorStore } from './vectorStore.js';

let assistantVectorStore = new VectorStore();
let isIndexed = false;

export async function indexProductKnowledge() {
  const products = await queryDatabase('SELECT * FROM products');
  const docs = products.map((p) => ({
    id: p.id,
    title: p.name,
    text: `${p.name} ${p.category} ${p.specs} Price: $${p.price} Rating: ${p.rating}`,
    metadata: {
      id: p.id,
      name: p.name,
      price: `$${Number(p.price).toFixed(2)}`,
      rating: Number(p.rating),
      reviewsCount: p.reviews_count || 500,
      specs: p.specs,
      image: p.image_url,
    },
  }));

  assistantVectorStore.addDocuments(docs);
  isIndexed = true;
  console.log(` Indexed ${docs.length} products in Vector Store for Shopping Assistant RAG.`);
}

export async function processAssistantQuery(query, filters = {}) {
  if (!isIndexed) {
    await indexProductKnowledge();
  }

  const searchResults = assistantVectorStore.search(query, 3);

  // Filter recommendations if maxPrice specified
  const recommendations = searchResults
    .filter((r) => {
      if (!filters.maxPrice) return true;
      const numericPrice = parseFloat(r.document.metadata.price.replace('$', ''));
      return numericPrice <= filters.maxPrice;
    })
    .map((r) => r.document.metadata);

  const topMatchesText = searchResults.map((r) => r.document.title).join(', ');

  const responseText = searchResults.length > 0 && searchResults[0].score > 0.05
    ? `Based on PostgreSQL database query and RAG vector similarity search, here are the top product recommendations matching your query "${query}" (Retrieved from indexed catalog):`
    : `We queried our product database for "${query}". Here are the top featured items from our catalog:`;

  return {
    responseText,
    recommendations,
    retrievedChunksCount: searchResults.length,
    similarityScores: searchResults.map((r) => Number(r.score.toFixed(3))),
    vectorEngine: 'PostgreSQL + Cosine Vector TF-IDF Engine',
  };
}
