'use client';

import Image from 'next/image';

const LINKS = [
  { name: 'DOCUMENTATION', url: 'https://github.com/MuhammadZaidan1/jay-next-dapps#readme' },
  { name: 'CORE CONTRACTS', url: 'https://github.com/MuhammadZaidan1/jay-hardhat-contracts' },
  { name: 'GITHUB', url: 'https://github.com/MuhammadZaidan1' },
  { name: 'LINKEDIN', url: 'https://www.linkedin.com/in/muhammad-zaidan-046872336/' }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between px-8 md:px-8 py-8 gap-8 bg-brand-black border-t-4 border-black">
      <div className="flex items-center gap-5">
        <div className="bg-brand-yellow text-brand-black px-2 py-2 flex items-center gap-2 shadow-[4px_4px_0px_#facc15] border-2 border-brand-yellow">
          <Image 
            src="/assets/logo-token.png" 
            alt="$JAY Protocol"
            width={40}  
            height={40} 
            className="object-contain"
          />
          <span className="font-black text-lg tracking-widest uppercase">
            $JAY
          </span>
        </div>        
        <span className="font-mono text-xs md:text-sm text-gray-500 font-black tracking-widest">
          © {currentYear} $JAY.SYS
        </span>
      </div>
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 font-mono text-[10px] md:text-xs text-gray-400">
        {LINKS.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-black tracking-[0.2em] hover:text-brand-yellow hover:underline transition-all uppercase"
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
}