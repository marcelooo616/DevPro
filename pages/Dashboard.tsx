import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Layers, Code2 } from 'lucide-react';
import { MOCK_MODULES } from '../constants';
import { getProgress } from '../services/storageService';
import { UserProgress } from '../types';

const Dashboard: React.FC = () => {
    const [progress, setProgress] = useState<UserProgress | null>(null);

    useEffect(() => {
        setProgress(getProgress());
    }, []);

    if (!progress) return <div>Carregando...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <section className="space-y-4 text-center sm:text-left">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                    Sua jornada para <span className="text-primary-500">Arquiteto Pro</span>
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl">
                    Domine as habilidades mais exigidas pelo mercado com mentoria personalizada de IA.
                    Aprenda fazendo, receba feedback instantâneo e evolua sua carreira.
                </p>
            </section>

            <section className="grid gap-6 md:grid-cols-2">
                {MOCK_MODULES.map((module, index) => {
                    const completedInModule = module.topics.filter(t => progress.completedTopics.includes(t.id)).length;
                    const totalInModule = module.topics.length;
                    const percent = Math.round((completedInModule / totalInModule) * 100) || 0;
                    const Icon = index % 2 === 0 ? Layers : Code2; // Alternate icons for visual variety

                    return (
                        <Link key={module.id} to={`/module/${module.id}`} className="group relative block p-6 bg-slate-900 rounded-2xl border border-slate-800 hover:border-primary-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-900/20 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-950/0 to-primary-950/30 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative flex flex-col h-full">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-slate-800 rounded-lg text-primary-400 group-hover:bg-primary-950 group-hover:text-primary-300 transition-colors">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                                        {completedInModule}/{totalInModule} Tópicos
                                    </span>
                                </div>

                                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                                    {module.title}
                                </h2>
                                <p className="text-slate-400 text-sm flex-grow">
                                    {module.description}
                                </p>

                                <div className="mt-6 space-y-2">
                                    <div className="flex justify-between text-xs text-slate-500">
                                        <span>Progresso</span>
                                        <span className={percent === 100 ? "text-accent-400 font-medium" : ""}>{percent}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-500 ease-out rounded-full ${percent === 100 ? 'bg-accent-500' : 'bg-primary-500'}`}
                                            style={{ width: `${percent}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center text-primary-400 text-sm font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                    Continuar Módulo <ChevronRight className="w-4 h-4 ml-1" />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </section>
        </div>
    );
};

export default Dashboard;
