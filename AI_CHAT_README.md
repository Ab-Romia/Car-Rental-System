# AI Chat Assistant Implementation

## Overview

The Car Rental System now includes an intelligent AI chat assistant powered by OpenAI's GPT models and a Retrieval-Augmented Generation (RAG) architecture. The assistant helps users with inquiries about car rentals, available vehicles, office locations, and general questions.

## Features

- **Real-time AI Responses**: Instant answers to user questions using GPT-3.5-turbo
- **Context-Aware**: RAG architecture retrieves relevant information from the database
- **Semantic Search**: Uses OpenAI embeddings for intelligent information retrieval
- **Conversation Memory**: Maintains chat history within the session
- **Responsive UI**: Beautiful chat widget that works on all devices
- **Dark Mode Support**: Seamlessly integrates with the site's theme system

## Architecture

### RAG (Retrieval-Augmented Generation)

The system uses a three-stage process:

1. **Indexing**: Car data, office locations, and FAQs are indexed with embeddings
2. **Retrieval**: User queries are matched against indexed content using semantic search
3. **Generation**: Retrieved context is used to generate accurate, relevant responses

### Components

```
services/
  └── ragService.js       # Core RAG logic, embeddings, and chat generation

routes/
  └── chatRoutes.js       # API endpoints for chat functionality

public/
  ├── css/
  │   └── chat.css        # Chat widget styling
  └── js/
      └── chat.js         # Frontend chat interface logic
```

## Setup

### 1. Install Dependencies

The OpenAI package is already installed. If you need to reinstall:

```bash
npm install openai
```

### 2. Configure Environment Variables

Add your OpenAI API key to your `.env` file:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

Get your API key from: https://platform.openai.com/api-keys

### 3. Initialize the Service

The RAG service automatically initializes when the server starts. It:
- Connects to the database
- Indexes all car and office data
- Generates embeddings for semantic search
- Becomes ready to handle chat requests

## Usage

### For End Users

1. Look for the chat icon in the bottom-right corner of any page
2. Click to open the chat widget
3. Type your question and press Enter or click Send
4. The AI assistant will respond with relevant information

### Example Questions

- "What cars do you have available?"
- "How do I rent a car?"
- "Where are your offices located?"
- "What are your rental requirements?"
- "Tell me about the Toyota Camry"

## API Endpoints

### POST `/chat/message`

Send a message and receive an AI response.

**Request:**
```json
{
  "message": "What cars are available?"
}
```

**Response:**
```json
{
  "success": true,
  "response": "We have several vehicles available including...",
  "timestamp": "2024-11-12T10:30:00.000Z"
}
```

### POST `/chat/clear`

Clear the conversation history for the current session.

**Response:**
```json
{
  "success": true,
  "message": "Conversation cleared"
}
```

### GET `/chat/health`

Check if the chat service is operational.

**Response:**
```json
{
  "success": true,
  "status": "operational",
  "initialized": true
}
```

## How It Works

### 1. Data Indexing

When the server starts, the RAG service:
```javascript
// Indexes car information
const cars = await Car.getAll();
// Indexes office locations
const offices = await Office.getAll();
// Adds general FAQ content
// Generates embeddings for all content
```

### 2. Query Processing

When a user asks a question:
```javascript
// Convert query to embedding
const queryEmbedding = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: userQuery
});

// Find relevant content using cosine similarity
const relevantContext = findSimilarDocuments(queryEmbedding);

// Generate response with context
const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    { role: "system", content: systemPrompt + relevantContext },
    { role: "user", content: userQuery }
  ]
});
```

### 3. Response Generation

The AI assistant:
- Uses retrieved context to provide accurate answers
- Maintains conversation history for follow-up questions
- Handles errors gracefully with helpful fallback messages
- Stays on topic related to car rentals

## Customization

### Updating Knowledge Base

To refresh the indexed data after database changes:

```javascript
const ragService = require('./services/ragService');
await ragService.refresh();
```

### Modifying System Behavior

Edit the system prompt in `services/ragService.js`:

```javascript
const systemMessage = `You are a helpful car rental assistant...`;
```

### Adjusting Retrieval

Change the number of relevant documents retrieved:

```javascript
const context = await this.retrieveRelevantContext(userMessage, topK = 5);
```

## Performance

- **Response Time**: Typically 1-3 seconds
- **Accuracy**: High relevance through semantic search
- **Scalability**: In-memory vector store suitable for small to medium datasets
- **Cost**: Uses efficient models (text-embedding-3-small, gpt-3.5-turbo)

## Limitations

- Requires active OpenAI API key
- In-memory storage (resets on server restart)
- Rate limits apply based on your OpenAI plan
- Context window limited to recent conversation history

## Troubleshooting

### Chat Not Responding

1. Check if OPENAI_API_KEY is set in .env
2. Verify API key is valid at https://platform.openai.com
3. Check server logs for initialization errors
4. Ensure you have API quota remaining

### Slow Responses

- Normal response time is 1-3 seconds
- Check your internet connection
- Verify OpenAI API status at https://status.openai.com

### Inaccurate Answers

- The system only knows about data in the database
- Try refreshing the knowledge base: `ragService.refresh()`
- Update the FAQ content in `ragService.js` for common questions

## Security

- API keys are stored in environment variables (never in code)
- User messages are not stored permanently
- Session-based conversation history with automatic cleanup
- Input validation prevents malicious requests

## Future Enhancements

Potential improvements:
- Persistent vector database (Pinecone, Weaviate)
- Multi-language support
- Voice input/output
- Integration with booking system
- Advanced analytics and conversation insights
- Custom training on company-specific data

## Support

For issues or questions about the AI chat system, check:
- Server logs for error messages
- OpenAI API usage dashboard
- This documentation

---

**Last Updated**: November 2024
**Version**: 1.0.0
