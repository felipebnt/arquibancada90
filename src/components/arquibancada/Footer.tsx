'use client';

import { motion } from 'framer-motion';
import { Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const footerLinks = [
    { label: 'Home', href: '#' },
    { label: 'Coleção', href: '#colecao' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <footer className="relative bg-[#0a0c0f] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <span className="text-2xl font-bold text-white">Arquibancada</span>
              <span className="text-2xl font-bold text-[#00FF9C]"> 90</span>
            </motion.div>
            <p className="text-white/40 text-sm mb-6 max-w-xs">
              Mostruário premium de camisas de futebol. Descubra os lançamentos mais recentes dos seus times favoritos.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#00FF9C] hover:border-[#00FF9C]/30 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Informações
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-white/40 hover:text-white transition-colors duration-200">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/40 hover:text-white transition-colors duration-200">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/40 hover:text-white transition-colors duration-200">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/30">
              © {currentYear} Arquibancada 90. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <p className="text-xs text-white/20">
                Mostruário digital de camisas — Apenas exibição
              </p>
              {/* Discreet admin link */}
              <a
                href="/admin"
                className="text-xs text-white/10 hover:text-white/30 transition-colors duration-300"
                aria-label="Área administrativa"
              >
                ·
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FF9C]/30 to-transparent" />
    </footer>
  );
}
