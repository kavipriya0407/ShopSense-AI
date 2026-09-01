import express from 'express';
import cors from 'cors';
import { getDbStatus } from './db/connection.js';
import { processAssistantQuery, indexProductKnowledge } from './services/ragAssistantService.js';
import { processAnalystQuery } from './services/ragAnalystService.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize RAG Product Vector Store on startup
indexProductKnowledge().catch((err) => {
  console.warn('Vector indexing initial warning:', err.message);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ShopSense RAG & PostgreSQL API Backend',
    timestamp: new Date().toISOString(),
  });
});

// Database Connection Status endpoint
app.get('/api/db/status', (req, res) => {
  res.json(getDbStatus());
});

// RAG Shopping Assistant Endpoint
app.post('/api/rag/assistant', async (req, res) => {
  try {
    const { query, filters } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query string is required' });
    }
    const result = await processAssistantQuery(query, filters || {});
    res.json(result);
  } catch (err) {
    console.error('RAG Assistant API Error:', err);
    res.status(500).json({ error: 'Failed to process RAG assistant query' });
  }
});

// RAG Data Analyst Endpoint
app.post('/api/rag/analyst', async (req, res) => {
  try {
    const { query, dateRange } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query string is required' });
    }
    const result = await processAnalystQuery(query, dateRange);
    res.json(result);
  } catch (err) {
    console.error('RAG Analyst API Error:', err);
    res.status(500).json({ error: 'Failed to process RAG analyst query' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 ShopSense RAG & PostgreSQL Backend API running on http://localhost:${PORT}`);
});
