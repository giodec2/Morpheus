import { Feather, Globe, MessageCircle } from 'lucide-react';

const links = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
];

export default function Footer() {
  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Feather className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <span className="font-bold text-gray-900 dark:text-white">Morpheus</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {links.map((link) => (
              <button
                key={link.label}
                onClick={() => handleClick(link.href)}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
            <span className="text-sm text-gray-400 dark:text-gray-600">Privacy</span>
            <span className="text-sm text-gray-400 dark:text-gray-600">Terms</span>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="GitHub"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Twitter"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-600">
            © 2025 Morpheus. Built for storytellers.
          </p>
        </div>
      </div>
    </footer>
  );
}
