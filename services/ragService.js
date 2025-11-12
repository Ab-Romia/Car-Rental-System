const OpenAI = require('openai');
const Car = require('../models/Car');
const Office = require('../models/Office');

class RAGService {
    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
        this.documents = [];
        this.embeddings = [];
        this.initialized = false;
    }

    async initialize() {
        if (this.initialized) return;

        try {
            await this.indexKnowledgeBase();
            this.initialized = true;
            console.log('RAG service initialized successfully');
        } catch (error) {
            console.error('Failed to initialize RAG service:', error.message);
        }
    }

    async indexKnowledgeBase() {
        this.documents = [];

        // Add general car rental information
        this.documents.push({
            content: "We are CarRental Pro, a professional car rental service offering a wide selection of vehicles. We provide flexible rental periods, competitive pricing, and excellent customer service.",
            type: "general",
            metadata: { category: "about" }
        });

        this.documents.push({
            content: "Our rental process is simple: browse available cars, select your preferred vehicle, choose pickup and return dates, and complete your reservation. You can manage your bookings through your dashboard.",
            type: "general",
            metadata: { category: "process" }
        });

        this.documents.push({
            content: "Payment is accepted at the time of reservation. We accept major credit cards. The rental fee is calculated based on the duration of your rental period.",
            type: "general",
            metadata: { category: "payment" }
        });

        this.documents.push({
            content: "To rent a car, you must be at least 21 years old with a valid driver's license. Additional drivers can be added to the reservation.",
            type: "general",
            metadata: { category: "requirements" }
        });

        // Index car data
        try {
            const cars = await Car.getAll();
            if (cars && cars.length > 0) {
                for (const car of cars) {
                    this.documents.push({
                        content: `We have a ${car.Model} from ${car.Year} available. Plate ID: ${car.PlateID}. Current status: ${car.Status}.`,
                        type: "car",
                        metadata: {
                            carId: car.PlateID,
                            model: car.Model,
                            year: car.Year,
                            status: car.Status
                        }
                    });
                }
            }
        } catch (error) {
            console.error('Error indexing cars:', error.message);
        }

        // Index office data
        try {
            const offices = await Office.getAll();
            if (offices && offices.length > 0) {
                for (const office of offices) {
                    this.documents.push({
                        content: `We have an office located at ${office.Location}. Office ID: ${office.OfficeID}. Contact: ${office.PhoneNumber || 'Available upon request'}.`,
                        type: "office",
                        metadata: {
                            officeId: office.OfficeID,
                            location: office.Location
                        }
                    });
                }
            }
        } catch (error) {
            console.error('Error indexing offices:', error.message);
        }

        // Generate embeddings for all documents
        await this.generateEmbeddings();
    }

    async generateEmbeddings() {
        this.embeddings = [];

        for (const doc of this.documents) {
            try {
                const response = await this.openai.embeddings.create({
                    model: "text-embedding-3-small",
                    input: doc.content
                });

                this.embeddings.push({
                    vector: response.data[0].embedding,
                    document: doc
                });
            } catch (error) {
                console.error('Error generating embedding:', error.message);
            }
        }
    }

    cosineSimilarity(vecA, vecB) {
        const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
        const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
        const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
        return dotProduct / (magnitudeA * magnitudeB);
    }

    async retrieveRelevantContext(query, topK = 3) {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            const queryEmbedding = await this.openai.embeddings.create({
                model: "text-embedding-3-small",
                input: query
            });

            const queryVector = queryEmbedding.data[0].embedding;

            const similarities = this.embeddings.map(item => ({
                similarity: this.cosineSimilarity(queryVector, item.vector),
                document: item.document
            }));

            similarities.sort((a, b) => b.similarity - a.similarity);

            return similarities.slice(0, topK).map(item => item.document.content);
        } catch (error) {
            console.error('Error retrieving context:', error.message);
            return [];
        }
    }

    async generateResponse(userMessage, conversationHistory = []) {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            const context = await this.retrieveRelevantContext(userMessage);

            const systemMessage = `You are a helpful car rental assistant for CarRental Pro. Use the following context to answer questions accurately and helpfully:

Context:
${context.join('\n\n')}

Guidelines:
- Be friendly and professional
- Provide accurate information based on the context
- If you don't know something, suggest the user contact support
- Help users with car rentals, bookings, and general inquiries
- Keep responses concise but informative`;

            const messages = [
                { role: "system", content: systemMessage },
                ...conversationHistory,
                { role: "user", content: userMessage }
            ];

            const response = await this.openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: messages,
                temperature: 0.7,
                max_tokens: 500
            });

            return response.choices[0].message.content;
        } catch (error) {
            console.error('Error generating response:', error.message);

            if (error.code === 'insufficient_quota') {
                return "I'm currently unavailable due to API limits. Please contact our support team for assistance.";
            }

            return "I apologize, but I'm having trouble processing your request right now. Please try again or contact our support team.";
        }
    }

    async refresh() {
        this.initialized = false;
        await this.initialize();
    }
}

module.exports = new RAGService();
