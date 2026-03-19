const API_URL = '/api/chat';

// Keep conversation history for context
let conversationHistory = [];

export async function askPersona(message) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        history: conversationHistory.slice(-10), // last 10 exchanges for context
      }),
    });

    const data = await res.json();

    if (data.response) {
      // Add to history
      conversationHistory.push({ role: 'user', content: message });
      conversationHistory.push({ role: 'assistant', content: data.response });
      return data.response;
    }

    return data.error || '  [persona offline]';
  } catch {
    return null; // null = fallback to scripted response
  }
}

export function clearChatHistory() {
  conversationHistory = [];
}
