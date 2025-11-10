import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Circle, Target, Rocket } from 'lucide-react';
import { MOCK_MODULES } from '../constants';
import { getProgress } from '../services/storageService';
import { UserProgress, Module } from '../types';

const ModulePage: React.FC = () => {
    const { moduleId } = useParams<{ moduleId: string }>();
    const navigate = useNavigate();
    const [moduleData, setModuleData] = useState<Module | undefined>(undefined);
    const [progress, setProgress] = useState<UserProgress | null>(null);

    useEffect(() => {
        const mod = MOCK_MODULES.find(m => m.id === moduleId);
        if (mod) {
            setModuleData(mod);
        } else {
             navigate('/'); // Redirect if module not found
        }
        setProgress(getProgress());
    }, [moduleId, navigate]);

    if (!moduleData || !progress) return null;

    const totalTopics = moduleData.topics.length;
    const completedTopicsCount = moduleData.topics.filter(t => progress.completedTopics.includes(t.id)).length;
    const percentComplete = Math.round((completedTopicsCount / totalTopics) * 100);

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para Dashboard
            </Link>

            <header className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                     <span className="text-xs font-bold tracking-wider text-primary-400 uppercase px-3 py-1 bg-primary-950/50 rounded-full border border-primary-900">
                        Módulo
                    </span>
                    {percentComplete === 100 && (
                         <span className="text-xs font-bold tracking-wider text-accent-400 uppercase px-3 py-1 bg-accent-950/50 rounded-full border border-accent-900 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Concluído
                        </span>
                    )}
                </div>
                <h1 className="text-4xl font-extrabold text-white">{moduleData.title}</h1>
                <p className="text-xl text-slate-300">{moduleData.description}</p>
            </header>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex items-start gap-4">
                <div className="p-3 bg-slate-800 rounded-lg text-primary-400 shrink-0">
                    <Target className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">Objetivo do Módulo</h3>
                    <p className="text-slate-300">{moduleData.objective}</p>
                </div>
            </div>

             <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Trilha de Aprendizado</h2>
                    <span className="text-sm text-slate-400">{completedTopicsCount} de {totalTopics} completados</span>
                </div>

                <div className="space-y-3">
                    {moduleData.topics.map((topic, index) => {
                        const isCompleted = progress.completedTopics.includes(topic.id);
                        const isNext = !isCompleted && (index === 0 || progress.completedTopics.includes(moduleData.topics[index - 1].id));
                        const isLocked = !isCompleted && !isNext;

                        return (
                            <Link
                                key={topic.id}
                                to={`/module/${moduleId}/topic/${topic.id}`}
                                className={`flex items-center p-4 rounded-xl border transition-all duration-200
                                    ${isCompleted ? 'bg-slate-900 border-slate-800 hover:border-accent-500/50' : ''}
                                    ${isNext ? 'bg-primary-950/30 border-primary-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:bg-primary-900/20' : ''}
                                    ${isLocked ? 'bg-slate-950 border-slate-800/50 opacity-50 cursor-not-allowed hover:border-slate-800/50' : ''}
                                `}
                                onClick={(e) => isLocked && e.preventDefault()}
                            >
                                <div className={`mr-4 shrink-0 ${isNext ? 'text-primary-400 animate-pulse' : ''}`}>
                                    {isCompleted ? (
                                        <CheckCircle2 className="w-6 h-6 text-accent-500" />
                                    ) : (
                                        <Circle className={`w-6 h-6 ${isNext ? 'text-primary-500' : 'text-slate-700'}`} />
                                    )}
                                </div>
                                <div className="flex-grow">
                                    <h3 className={`font-medium ${isCompleted || isNext ? 'text-white' : 'text-slate-400'}`}>
                                        {index + 1}. {topic.title}
                                    </h3>
                                    <p className="text-sm text-slate-500">{topic.description}</p>
                                </div>
                                {isNext && (
                                    <div className="px-3 py-1 text-xs font-medium bg-primary-500 text-white rounded-full">
                                        Começar
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>

             <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-6 mt-8 opacity-75">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-slate-800 rounded-lg text-slate-400 shrink-0">
                        <Rocket className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-1">Projeto Final (Em breve)</h3>
                        <p className="text-slate-400 text-sm mb-3">{moduleData.finalProject}</p>
                        <p className="text-xs text-slate-500">Complete todos os tópicos para desbloquear o desafio final.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModulePage;
