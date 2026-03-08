import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src='/Zelko_logo_img_white_bg.png' alt="Zelko Market" width={40} height={40} />
              <span className="font-bold">Zelko Market</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              La tua destinazione per lo shopping online di qualità, sicuro e veloce.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/products" className="hover:text-primary transition-colors">Tutti i prodotti</Link></li>
              <li><Link to="/categories/tech" className="hover:text-primary transition-colors">Tecnologia</Link></li>
              <li><Link to="/categories/home" className="hover:text-primary transition-colors">Casa</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Supporto</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-primary transition-colors">Spedizioni</Link></li>
              <li><Link to="/returns" className="hover:text-primary transition-colors">Resi</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Legale</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Termini di Servizio</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} MyStore. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
}
