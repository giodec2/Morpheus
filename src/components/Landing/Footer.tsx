import { Feather, Globe, MessageCircle, Cookie } from 'lucide-react';
import { Link } from 'wouter';
import { openCookieSettings } from '@/components/Legal/CookieBanner';

const scrollToSection = (href: string) => {
  const el = document.querySelector(href);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Feather className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <span className="font-bold text-gray-900 dark:text-white">Morpheus</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              The AI co-writer that learns your voice. Plan worlds, develop characters, and banish blank-page syndrome for good.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-3">Product</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection('#features')} className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('#how-it-works')} className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('#pricing')} className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Pricing
                </button>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <button onClick={openCookieSettings} className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors inline-flex items-center gap-1">
                  <Cookie className="w-3.5 h-3.5" />
                  Cookie Settings
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-3">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:hello@morpheusink.com" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  hello@morpheusink.com
                </a>
              </li>
              <li>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Via Gaspare Gozzi 113, 00145 Roma (RM)
                </span>
              </li>
            </ul>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="#"
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Contact"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Note Legali */}
        <div className="border-t border-gray-100 dark:border-slate-800 pt-6 mb-6">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Note Legali / Legal Notice
          </h4>
          <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
            <strong className="text-gray-500 dark:text-gray-400">Giovanni de Caprio</strong> — Ditta Individuale
            {' · '}Sede: Via Gaspare Gozzi 113, 00145 Roma (RM), Italia
            {' · '}C.F.: DCPGNN04P28H501W
            {' · '}P.IVA: 18340151002
            {' · '}Codice ATECO: 62.10.00 (Attività di programmazione informatica)
            {' · '}Regime fiscale: Regime Forfettario
          </p>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-100 dark:border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 dark:text-gray-600">
            © {new Date().getFullYear()} Morpheus. Built for storytellers. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-600">
            Made with care in Rome, Italy 🇮🇹
          </p>
        </div>
      </div>
    </footer>
  );
}
