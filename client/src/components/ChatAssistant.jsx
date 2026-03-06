import React, { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
      <div ref={chatContainerRef} className={`w-full ${started ? 'h-80' : 'h-64'} overflow-y-auto px-4 pb-4 space-y-4`}>
        {messages.map((m, idx) => (
          <div key={idx} className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-2xl px-4 py-2 max-w-[80%] break-words ${m.role === 'user' ? 'bg-primary-200 text-gray-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
              {m.role === 'assistant' ? (
                <div className="prose max-w-none text-gray-900 dark:text-gray-100 leading-relaxed overflow-y-auto">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h2: ({ children }) => (
                        <h2 className="text-xl font-bold mt-4 mb-3 border-b-2 border-gray-400 dark:border-gray-500 pb-2 text-gray-900 dark:text-white">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-lg font-bold mt-4 mb-2 border-b border-gray-300 dark:border-gray-600 pb-1 text-gray-900 dark:text-white">
                          {children}
                        </h3>
                      ),
                      h4: ({ children }) => (
                        <h4 className="text-md font-semibold mt-2 mb-1 ml-2 text-blue-600 dark:text-blue-400">
                          {children}
                        </h4>
                      ),
                      p: ({ children }) => {
                        const text = children?.toString() || '';
                        // Check if paragraph starts with bullet point
                        if (text.startsWith('•')) {
                          return <li className="mb-2 leading-relaxed list-disc ml-6">{children}</li>;
                        }
                        return <p className="mb-2">{children}</p>;
                      },
                      ul: ({ children }) => <ul className="list-disc ml-6 mt-2 mb-4 space-y-2">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal ml-6 mt-2 mb-4 space-y-2">{children}</ol>,
                      li: ({ children }) => <li className="ml-2 mb-1 leading-relaxed">{children}</li>,
                      table: ({ children }) => (
                        <div className="overflow-x-auto my-4">
                          <table className="min-w-full border border-gray-400 dark:border-gray-600 text-sm rounded-md">
                            {children}
                          </table>
                        </div>
                      ),
                      th: ({ children }) => (
                        <th className="border border-gray-400 dark:border-gray-600 px-3 py-2 font-semibold bg-gray-200 dark:bg-gray-800 text-left text-gray-900 dark:text-white">
                          {children}
                        </th>
                      ),
                      td: ({ children }) => (
                        <td className="border border-gray-400 dark:border-gray-600 px-3 py-2 text-gray-800 dark:text-gray-200">
                          {children}
                        </td>
                      ),
                      strong: ({ children }) => <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>,
                      br: () => <br />,
                      code: ({ children }) => <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
                      blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-2">{children}</blockquote>,
                    }}
                  >
                    {m.content
                      ?.replace(/\[\d+\]/g, "") // remove [1], [2], etc.
                      ?.replace(/\n?•\s*•/g, "\n- ") // remove duplicate bullets
                      ?.replace(/\n?•/g, "\n- ") // ensure each bullet starts on a new line
                      ?.replace(/([^#\n])(##\s)/g, "$1\n\n$2") // add line break before ## headers
                      ?.replace(/([^#\n])(###\s)/g, "$1\n\n$2") // add line break before ### headers
                      ?.replace(/([^#\n])(####\s)/g, "$1\n\n$2") // add line break before #### headers
                      ?.replace(/([^#\n])(#####\s)/g, "$1\n\n$2") // add line break before ##### headers
                      ?.replace(/\n\s*\n/g, "\n\n") // clean up extra line breaks
                      ?.trim()}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">{m.content}</div>
              )}
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