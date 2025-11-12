const express = require('express');
const router = express.Router();
const ragService = require('../services/ragService');

// Store conversation history in memory (session-based)
const conversationStore = new Map();

// Get or create conversation data for a session
function getConversationData(sessionId) {
    if (!conversationStore.has(sessionId)) {
        conversationStore.set(sessionId, {
            history: [],
            timestamp: Date.now()
        });
    }
    return conversationStore.get(sessionId);
}

// Clean up old conversations (older than 1 hour)
setInterval(() => {
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    for (const [sessionId, data] of conversationStore.entries()) {
        if (data.timestamp && data.timestamp < oneHourAgo) {
            conversationStore.delete(sessionId);
        }
    }
}, 10 * 60 * 1000); // Check every 10 minutes

// POST /chat/message - Send a message and get AI response
router.post('/message', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Message is required'
            });
        }

        // Use session ID or create a temporary one based on IP and timestamp
        let sessionId;
        if (req.session && req.session.id) {
            sessionId = req.session.id;
        } else {
            const ip = req.ip || req.connection.remoteAddress || 'unknown';
            sessionId = `temp-${ip}-${Math.floor(Date.now() / 1000)}`;
        }

        const conversationData = getConversationData(sessionId);
        const conversationHistory = conversationData.history;

        // Generate AI response
        const aiResponse = await ragService.generateResponse(message, conversationHistory);

        // Update conversation history
        conversationHistory.push(
            { role: 'user', content: message },
            { role: 'assistant', content: aiResponse }
        );

        // Keep only last 10 messages to manage memory
        if (conversationHistory.length > 10) {
            conversationHistory.splice(0, conversationHistory.length - 10);
        }

        // Update timestamp
        conversationData.timestamp = Date.now();

        res.json({
            success: true,
            response: aiResponse,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to process your message. Please try again.'
        });
    }
});

// POST /chat/clear - Clear conversation history
router.post('/clear', (req, res) => {
    try {
        let sessionId;
        if (req.session && req.session.id) {
            sessionId = req.session.id;
        } else {
            const ip = req.ip || req.connection.remoteAddress || 'unknown';
            sessionId = `temp-${ip}-${Math.floor(Date.now() / 1000)}`;
        }

        conversationStore.delete(sessionId);

        res.json({
            success: true,
            message: 'Conversation cleared'
        });
    } catch (error) {
        console.error('Clear conversation error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to clear conversation'
        });
    }
});

// GET /chat/health - Check if chat service is available
router.get('/health', (req, res) => {
    res.json({
        success: true,
        status: 'operational',
        initialized: ragService.initialized,
        apiKeyAvailable: ragService.apiKeyAvailable
    });
});

module.exports = router;
