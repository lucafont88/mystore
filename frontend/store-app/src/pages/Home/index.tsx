import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Truck } from 'lucide-react';

export default function HomePage() {
  useTranslation();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-slate-950 to-slate-950" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Scopri il futuro dello <span className="text-indigo-500">shopping online</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Prodotti di alta qualità, spedizioni lampo e un servizio clienti impeccabile. Tutto quello di cui hai bisogno, in un unico posto.
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
              <h3 className="text-xl font-bold mb-2 text-foreground">Spedizione Gratuita</h3>
              <p className="text-muted-foreground text-sm">Per ordini superiori a 50€, la spedizione la offriamo noi.</p>
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
