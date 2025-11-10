import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
    content: string;
    className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = "" }) => {
    return (
        <div className={`prose prose-invert prose-slate max-w-none
            prose-headings:text-slate-100 prose-a:text-primary-400 hover:prose-a:text-primary-300
            prose-strong:text-white prose-code:text-accent-300 prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800
            ${className}`}
        >
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;
