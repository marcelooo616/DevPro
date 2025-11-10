import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bot, Send, Sparkles, CheckCircle, User } from 'lucide-react';
import { MOCK_MODULES } from '../constants';
import { getProgress, markTopicComplete, saveInteraction, getInteractionForTopic } from '../services/storageService';
import { evaluateSubmission } from '../services/geminiService';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { Topic, AIInteraction } from '../types';

const TopicPage: React.FC = () => {
    const { moduleId, topicId } = useParams<{ moduleId: string; topicId: string }>();
    const navigate = useNavigate();
    const [topic, setTopic] = useState<Topic | undefined>(undefined);
    const [submission, setSubmission] = useState('');
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [interaction, setInteraction] = useState<AIInteraction | undefined>(undefined);
    const feedbackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mod = MOCK_MODULES.find(m => m.id === moduleId);
        if (mod) {
            const t = mod.topics.find(top => top.id === topicId);
            if (t) {
                setTopic(t);
                // Load previous interaction if exists
                const prevInteraction = getInteractionForTopic(t.id);
                if (prevInteraction) {
                    setInteraction(prevInteraction);
                    setSubmission(prevInteraction.userSubmission);
                }
            } else {
                navigate(`/module/${moduleId}`);
            }
        } else {
            navigate('/');
        }
    }, [moduleId, topicId, navigate]);

    useEffect(() => {
        // Auto-scroll to feedback when it arrives
        if (interaction && feedbackRef.current) {
            feedbackRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [interaction]);

    const handleSubmit = async () => {
        if (!topic || !submission.trim()) return;

        setIsEvaluating(true);
        const feedback = await evaluateSubmission(topic.title, topic.activityPrompt, submission);
        setIsEvaluating(false);

        const newInteraction: AIInteraction = {
            topicId: topic.id,
            userSubmission: submission,
            aiFeedback: feedback,
            timestamp: Date.now()
        };

        setInteraction(newInteraction);
        saveInteraction(newInteraction);

        // Only mark complete if we got a valid response (rough check for error message)
        if (!feedback.startsWith("⚠️")) {
             markTopicComplete(topic.id);
        }
    };

    if (!topic) return <div className="p-8 text-center animate-pulse">Carregando conteúdo...</div>;

    const isCompleted = interaction && !interaction.aiFeedback.startsWith("⚠️");

    return (
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 pb-20">
            {/* Left Column: Content */}
            <div className="space-y-8">
                <Link to={`/module/${moduleId}`} className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Voltar ao Módulo
                </Link>

                <article className="space-y-6">
                    <header>
                        <h1 className="text-3xl font-extrabold text-white mb-2">{topic.title}</h1>
                        <p className="text-lg text-slate-300">{topic.description}</p>
                    </header>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8">
                        <MarkdownRenderer content={topic.content} />
                    </div>
                </article>
            </div>

            {/* Right Column: Activity & AI Mentor - Sticky on larger screens */}
            <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] flex flex-col">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-full overflow-hidden shadow-xl">
                    {/* Mentor Header */}
                    <div className="bg-slate-800/50 p-4 border-b border-slate-800 flex items-center gap-3">
                        <div className="p-2 bg-primary-600/20 text-primary-400 rounded-lg">
                            <Bot className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm">Mentor AI</h3>
                            <p className="text-xs text-slate-400">Avaliação e feedback em tempo real</p>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                        {/* Activity Prompt */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-accent-400 font-medium text-sm uppercase tracking-wider">
                                <Sparkles className="w-4 h-4" />
                                Atividade Prática
                            </div>
                            <p className="text-white font-medium leading-relaxed">
                                {topic.activityPrompt}
                            </p>
                        </div>

                        {/* User Submission Area (show even if completed, but maybe disabled or clearly marked as 'Your Answer') */}
                        <div className="space-y-2">
                             <div className="flex items-center gap-2 text-slate-400 font-medium text-xs uppercase tracking-wider">
                                <User className="w-3 h-3" />
                                Sua Resposta
                            </div>
                            <textarea
                                className={`w-full h-48 bg-slate-950 border rounded-xl p-4 text-slate-200 resize-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all
                                    ${isCompleted ? 'border-accent-500/30 opacity-80' : 'border-slate-700 placeholder-slate-600'}
                                `}
                                placeholder="Escreva sua análise aqui. Pense como um arquiteto..."
                                value={submission}
                                onChange={(e) => setSubmission(e.target.value)}
                                disabled={isEvaluating}
                            />
                            {!isCompleted && (
                                <button
                                    onClick={handleSubmit}
                                    disabled={isEvaluating || submission.length < 10}
                                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-900/20"
                                >
                                    {isEvaluating ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Analisando...
                                        </>
                                    ) : (
                                        <>
                                            Enviar para Avaliação <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>

                        {/* AI Feedback Area */}
                        {interaction && (
                            <div ref={feedbackRef} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <div className={`rounded-xl p-5 border relative overflow-hidden ${interaction.aiFeedback.startsWith("⚠️") ? 'bg-red-950/30 border-red-900/50' : 'bg-primary-950/30 border-primary-500/30'}`}>
                                    {isCompleted && !interaction.aiFeedback.startsWith("⚠️") && (
                                         <div className="absolute top-0 right-0 p-2">
                                            <div className="flex items-center gap-1 text-xs font-bold text-accent-400 bg-accent-950/50 px-2 py-1 rounded-full border border-accent-900/50">
                                                <CheckCircle className="w-3 h-3" /> Completo
                                            </div>
                                        </div>
                                    )}
                                    <MarkdownRenderer content={interaction.aiFeedback} className="text-sm" />
                                </div>
                                {isCompleted && (
                                     <button
                                        onClick={() => handleSubmit()} // Allow resubmission for new feedback
                                        className="mt-4 w-full text-xs text-slate-500 hover:text-primary-400 transition-colors flex justify-center"
                                    >
                                        Refazer resposta e pedir nova avaliação
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopicPage;
