import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Terminal, Award } from 'lucide-react';
import { APP_NAME } from '../constants';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200">
            <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 font-bold text-xl text-white hover:text-primary-400 transition-colors">
                        <Terminal className="w-6 h-6 text-primary-500" />
                        <span>{APP_NAME}</span>
                    </Link>
                    <nav className="flex items-center gap-6 text-sm font-medium">
                        <Link to="/" className={`flex items-center gap-2 transition-colors ${isActive('/') ? 'text-primary-400' : 'text-slate-400 hover:text-white'}`}>
                            <BookOpen className="w-4 h-4" />
                            <span className="hidden sm:inline">Módulos</span>
                        </Link>
                         <div className={`flex items-center gap-2 transition-colors text-slate-600 cursor-not-allowed`} title="Em breve">
                            <Award className="w-4 h-4" />
                            <span className="hidden sm:inline">Conquistas</span>
                        </div>
                    </nav>
                </div>
            </header>
            <main className="flex-1 container mx-auto px-4 py-8">
                {children}
            </main>
            <footer className="py-6 border-t border-slate-800 text-center text-slate-500 text-sm">
                <p>© {new Date().getFullYear()} {APP_NAME}. Potencializado por Google Gemini.</p>
            </footer>
        </div>
    );
};

export default Layout;
