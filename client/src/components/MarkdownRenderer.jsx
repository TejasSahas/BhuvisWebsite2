import React from 'react';

const MarkdownRenderer = ({ content }) => {
  // Parse markdown-like formatting - SIMPLIFIED VERSION
  const parseMarkdown = (text) => {
    if (!text) return '';
    
    // Split by lines to handle line breaks
    const lines = text.split('\n');
    
    return lines.map((line, lineIndex) => {
      // Skip empty lines
      if (!line.trim()) {
        return <br key={lineIndex} />;
      }
      
      // Handle headers (lines that start with ### or contain ### anywhere)
      const headerMatch = line.match(/(#+)/);
      if (headerMatch) {
        const level = headerMatch[1].length;
        // Extract text before the ### and clean it up
        const headerText = line.replace(/#+\s*$/, '').trim();
        return (
          <div key={lineIndex} className="font-bold text-gray-900 dark:text-white mt-4 mb-2 text-base">
            {parseInlineMarkdown(headerText)}
          </div>
        );
      }
      
      // Handle bullet points - convert to simple paragraphs
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        const content = line.replace(/^[•-]\s*/, '').trim();
        
        // Skip empty bullet points or malformed ones
        if (!content || content === '-' || content === '--' || content === '•') {
          return null;
        }
        
        return (
          <p key={lineIndex} className="my-2 leading-relaxed">
            {parseInlineMarkdown(content)}
          </p>
        );
      }
      
      // Handle numbered lists - convert to simple paragraphs
      if (/^\d+\./.test(line.trim())) {
        const content = line.replace(/^\d+\.\s*/, '').trim();
        return (
          <p key={lineIndex} className="my-2 leading-relaxed">
            {parseInlineMarkdown(content)}
          </p>
        );
      }
      
      // Handle inline numbered lists (like "1.Price & Appreciation Trends")
      if (/^\d+\.\w/.test(line.trim())) {
        const content = line.replace(/^\d+\./, '').trim();
        return (
          <p key={lineIndex} className="my-2 leading-relaxed">
            {parseInlineMarkdown(content)}
          </p>
        );
      }
      
      // Regular paragraph
      return (
        <p key={lineIndex} className="my-2 leading-relaxed">
          {parseInlineMarkdown(line)}
        </p>
      );
    }).filter(Boolean);
  };
  
  // Parse inline markdown formatting - ONLY BOLD AND BASIC FORMATTING
  const parseInlineMarkdown = (text) => {
    if (!text) return '';
    
    // Process formatting in order of specificity (most specific first)
    let processed = text;
    
    // Bold (double asterisks) - must come before italic to avoid conflicts
    processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900 dark:text-white">$1</strong>');
    
    // Italic (double underscores)
    processed = processed.replace(/__(.*?)__/g, '<em class="italic">$1</em>');
    
    // Italic (single asterisks) - only if not already processed as bold
    processed = processed.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em class="italic">$1</em>');
    
    // Strikethrough
    processed = processed.replace(/--(.*?)--/g, '<del class="line-through text-gray-500">$1</del>');
    
    // Code
    processed = processed.replace(/`(.*?)`/g, '<code class="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">$1</code>');
    
    // Return as dangerouslySetInnerHTML for proper HTML rendering
    return <span dangerouslySetInnerHTML={{ __html: processed }} />;
  };
  
  return (
    <div className="markdown-content">
      {parseMarkdown(content)}
    </div>
  );
};

export default MarkdownRenderer;