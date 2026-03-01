import DesktopGuide from '@/components/guide/DesktopGuide';
import MobileGuide from '@/components/guide/MobileGuide';
import SepoliaGuide from '@/components/guide/SepoliaGuide';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function GuidePage() {
    return (
        <main 
        className="min-h-screen bg-white relative"
        style={{
            backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
        }}
        >
        <section className="border-b-4 border-black pt-12 pb-20 px-4 sm:px-6 bg-brand-yellow relative overflow-hidden">
            <div 
            className="absolute inset-0 opacity-50 pointer-events-none" 
            style={{ backgroundImage: 'radial-gradient(circle at 4px 4px, black 1.5px, transparent 0)', backgroundSize: '24px 24px' }}
            />        
            <div className="max-w-7xl mx-auto relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 font-black uppercase text-xs border-2 border-black px-4 py-2 mb-8 bg-white hover:bg-black hover:text-white transition-all shadow-brutal">
                <ArrowLeft size={16} strokeWidth={3} /> Back to App
            </Link>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-tight md:leading-none mb-6 text-black wrap-break-word [text-shadow:3px_3px_0px_white,5px_5px_0px_rgba(0,0,0,0.2)]">
                USER_<wbr />ONBOARDING
            </h1>
            <p className="font-mono text-sm sm:text-lg md:text-2xl font-black uppercase max-w-2xl bg-black text-white px-4 py-2 inline-block shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
                Master the $JAY ecosystem in 3 simple steps.
            </p>
            </div>
        </section>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-16 md:space-y-20 relative z-10">
            <DesktopGuide />
            <MobileGuide />
            <SepoliaGuide />
        </section>
        </main>
    );
}