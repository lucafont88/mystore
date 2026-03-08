import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Truck } from 'lucide-react';

export default function HomePage() {
  useTranslation();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 pt-12 pb-24 sm:pt-14 sm:pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-slate-950 to-slate-950" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            {/* Logo */}
            <div className="mb-10 flex justify-center animate-in fade-in slide-in-from-bottom-2 duration-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 800 400"
                className="w-80 sm:w-[420px] drop-shadow-[0_0_32px_rgba(99,102,241,0.25)]"
                aria-label="Zelko Market"
              >
                <defs>
                  <linearGradient id="zelko-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor:'#fd79a8',stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:'#e17055',stopOpacity:1}} />
                  </linearGradient>
                </defs>
                <circle cx="180" cy="180" r="72" fill="none" stroke="url(#zelko-grad)" strokeWidth="4"/>
                <line x1="145" y1="145" x2="215" y2="145" stroke="#ffffff" strokeWidth="6" strokeLinecap="round"/>
                <line x1="215" y1="145" x2="145" y2="215" stroke="#ffffff" strokeWidth="6" strokeLinecap="round"/>
                <line x1="145" y1="215" x2="215" y2="215" stroke="#ffffff" strokeWidth="6" strokeLinecap="round"/>
                <circle cx="180" cy="180" r="4" fill="url(#zelko-grad)"/>
                <text x="280" y="186" fontFamily="Arial, Helvetica, sans-serif" fontSize="60" fontWeight="300" fill="#ffffff" letterSpacing="10">ZELKO</text>
                <rect x="280" y="200" width="45" height="2" fill="url(#zelko-grad)"/>
                <text x="280" y="232" fontFamily="Arial, Helvetica, sans-serif" fontSize="22" fontWeight="300" fill="#a29bac" letterSpacing="16">MARKET</text>
                <line x1="100" y1="310" x2="700" y2="310" stroke="#3d3d5a" strokeWidth="1"/>
                <text x="400" y="345" fontFamily="Arial, Helvetica, sans-serif" fontSize="20" fontWeight="300" fill="#9b99b8" letterSpacing="10" textAnchor="middle">YOUR MARKETPLACE</text>
              </svg>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Scopri il futuro dello <span className="text-indigo-500">shopping online</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Tutto quello di cui hai bisogno, in un unico posto per la gestione e costruzione del tuo ecommerce.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-500">
                <Link to="/products">
                  Sfoglia il catalogo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" className="text-white hover:bg-white/10">
                <Link to="/register">Crea un account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 rounded-xl border bg-card shadow-sm">
              <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Velocità Incredibile</h3>
              <p className="text-muted-foreground text-sm">Navigazione fluida e checkout istantaneo per non perdere tempo.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl border bg-card shadow-sm">
              <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Pagamenti Sicuri</h3>
              <p className="text-muted-foreground text-sm">Utilizziamo le tecnologie di crittografia più avanzate per i tuoi dati.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl border bg-card shadow-sm">
              <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Creazione dei Negozi Semplice e Veloce</h3>
              <p className="text-muted-foreground text-sm">La creazione del negozio è semplice e veloce, permettendo di iniziare a vendere in pochi minuti.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-2">Pronto a iniziare?</h2>
              <p className="text-indigo-100 text-lg">Unisciti a migliaia di utenti soddisfatti.</p>
            </div>
            <Button asChild size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-indigo-50">
              <Link to="/products">Inizia ora lo shopping</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
