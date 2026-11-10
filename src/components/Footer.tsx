import React from 'react';
import { Shield, BookOpen, ExternalLink, Heart } from 'lucide-react';
import { Language } from '../types/kas';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <footer className="w-full bg-[#080b11] border-t border-slate-800/80 pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative z-20 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* Brand Col */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center font-serif font-black text-white text-base">
              K
            </div>
            <span className="text-lg font-bold text-slate-100">KanASu (ಕನಸು)</span>
          </div>
          <p className="max-w-md text-slate-400 leading-relaxed text-xs">
            {language === 'kn'
              ? 'ಕರ್ನಾಟಕ ಲೋಕಸೇವಾ ಆಯೋಗದ (KPSC) ಗೆಜೆಟೆಡ್ ಪ್ರೊಬೇಷನರ್ಸ್ (KAS) ಪರೀಕ್ಷಾ ಆಕಾಂಕ್ಷಿಗಳಿಗೆ ಮೀಸಲಾದ ೩ಡಿ ಕಲಿಕಾ ಮತ್ತು ಹೈಂಡ್‌ಸೈಟ್ ಮೆಮೊರಿ ವ್ಯವಸ್ಥೆ.'
              : 'The flagship 120 FPS 3D spatial preparation engine and Hindsight memory matrix built for Karnataka Administrative Services (KPSC KAS) aspirants.'}
          </p>
          <div className="flex items-center gap-2 text-[11px] text-amber-400 font-mono">
            <span>Official Pattern: Paper I & II</span>
            <span>•</span>
            <span>0.25 Negative Marking Guard</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-slate-200 font-semibold mb-3 uppercase tracking-wider text-[11px]">
            {language === 'kn' ? 'ಪಠ್ಯಕ್ರಮ ವಿಭಾಗಗಳು' : 'Exam Domains'}
          </h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#syllabus" className="hover:text-amber-400 transition-colors">Karnataka History & Heritage</a></li>
            <li><a href="#syllabus" className="hover:text-amber-400 transition-colors">Western Ghats Ecology & Rivers</a></li>
            <li><a href="#syllabus" className="hover:text-amber-400 transition-colors">Article 371(J) & State Governance</a></li>
            <li><a href="#mental-ability" className="hover:text-amber-400 transition-colors">Paper II Mental Ability Solver</a></li>
          </ul>
        </div>

        {/* Official Resources */}
        <div>
          <h4 className="text-slate-200 font-semibold mb-3 uppercase tracking-wider text-[11px]">
            {language === 'kn' ? 'ಅಧಿಕೃತ ಸಂಪನ್ಮೂಲಗಳು' : 'Official Portals'}
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a 
                href="https://kpsc.kar.nic.in" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1 hover:text-amber-400 transition-colors"
              >
                <span>KPSC Official Portal</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </li>
            <li>
              <a 
                href="https://karnataka.gov.in" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1 hover:text-amber-400 transition-colors"
              >
                <span>Karnataka State Portal</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </li>
            <li>
              <a 
                href="#readiness" 
                className="hover:text-amber-400 transition-colors"
              >
                Hall Ticket & Exam Protocols
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 font-mono">
        <div>
          © {new Date().getFullYear()} KanASu. Developed with precision for KPSC KAS aspirants across Karnataka.
        </div>
        <div className="flex items-center gap-3">
          <span>120Hz Ultra-Fluid Spatial Engine</span>
          <span>•</span>
          <span className="text-amber-400/90 font-medium">Hindsight SM-2 Compliant</span>
        </div>
      </div>
    </footer>
  );
};
