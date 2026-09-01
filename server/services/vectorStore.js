// Lightweight, high-speed Term Frequency - Inverse Document Frequency (TF-IDF) & Cosine Vector Store

function tokenize(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

function computeTF(tokens) {
  const tf = {};
  for (const token of tokens) {
    tf[token] = (tf[token] || 0) + 1;
  }
  const total = tokens.length || 1;
  for (const key in tf) {
    tf[key] = tf[key] / total;
  }
  return tf;
}

export class VectorStore {
  constructor() {
    this.documents = [];
    this.vocabulary = new Set();
    this.idf = {};
  }

  addDocuments(docs) {
    // docs: Array of { id, text, metadata }
    this.documents = docs.map((doc) => {
      const tokens = tokenize(`${doc.title || ''} ${doc.text} ${JSON.stringify(doc.metadata || {})}`);
      tokens.forEach((t) => this.vocabulary.add(t));
      return {
        ...doc,
        tokens,
        tf: computeTF(tokens),
      };
    });

    this.computeIDF();
    this.vectorizeDocuments();
  }

  computeIDF() {
    const N = this.documents.length || 1;
    this.vocabulary.forEach((term) => {
      let docFreq = 0;
      this.documents.forEach((doc) => {
        if (doc.tokens.includes(term)) docFreq++;
      });
      this.idf[term] = Math.log(1 + N / (1 + docFreq));
    });
  }

  vectorizeDocuments() {
    const vocabArray = Array.from(this.vocabulary);
    this.documents.forEach((doc) => {
      doc.vector = vocabArray.map((term) => (doc.tf[term] || 0) * (this.idf[term] || 0));
    });
  }

  vectorizeText(text) {
    const tokens = tokenize(text);
    const tf = computeTF(tokens);
    const vocabArray = Array.from(this.vocabulary);
    return vocabArray.map((term) => (tf[term] || 0) * (this.idf[term] || 0));
  }

  cosineSimilarity(vecA, vecB) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  search(query, topK = 3) {
    const queryVector = this.vectorizeText(query);
    const results = this.documents.map((doc) => {
      const similarity = this.cosineSimilarity(queryVector, doc.vector);
      return {
        document: doc,
        score: similarity,
      };
    });

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, topK);
  }
}
