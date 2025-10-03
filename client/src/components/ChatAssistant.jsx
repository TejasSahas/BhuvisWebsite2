import React, { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

const ChatAssistant = ({ started, onStart, messages, setMessages }) => {
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    // Scroll only the chat container, not the entire page
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    const newHeight = Math.min(textareaRef.current.scrollHeight, 120);
    textareaRef.current.style.height = `${newHeight}px`;
  }, [input]);

  const send = async () => {
    if (!input.trim()) return;
    if (!started) onStart?.();
    const userMsg = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsSending(true);

    try {
      const res = await fetch('/api/perplexity/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMsg.content })
      });
      const data = await res.json();
      const aiContent = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
      setMessages((prev) => [...prev, { role: 'assistant', content: aiContent }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'There was an error contacting BhuvisAI.' }]);
    } finally {
      setIsSending(false);
    }
  };

  const content = (
    <div className={`w-full ${started ? '' : 'max-w-2xl mx-auto'}`}>
      <div ref={chatContainerRef} className={`w-full ${started ? 'h-80' : 'h-64'} overflow-y-auto px-2`}>
        {messages.map((m, idx) => (
          <div key={idx} className={`flex w-full my-1 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-2xl px-4 py-2 max-w-[80%] break-words ${m.role === 'user' ? 'bg-primary-200 text-gray-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
              <MarkdownRenderer content={m.content} />
            </div>
          </div>
        ))}
      </div>

      <form
        className="w-full mt-2"
        onSubmit={(e) => { e.preventDefault(); send(); }}
      >
        <div className="flex items-end gap-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask BhuvisAI about markets, projects, ROI..."
            rows={1}
            className="flex-1 resize-none outline-none bg-transparent text-sm max-h-32 whitespace-pre-wrap break-words"
          />
          <button
            type="submit"
            disabled={isSending}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-transform ${isSending ? 'opacity-50' : 'hover:scale-105'} bg-primary-600 text-white`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );

  return content;
};

export default ChatAssistant;


