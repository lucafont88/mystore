import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { useCartStore } from '@/stores/cartStore';
import { CartItem } from './CartItem';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CartDrawer() {
  const { items, isOpen, setOpen, getTotalPrice, getTotalItems } = useCartStore();
  const navigate = useNavigate();

  const formattedTotal = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(getTotalPrice());

  const handleCheckout = () => {
    setOpen(false);
    navigate('/checkout');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Il tuo Carrello ({getTotalItems()})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-1">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-2 text-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground opacity-20" />
              <p className="text-lg font-medium text-muted-foreground">Il carrello è vuoto</p>
              <Button variant="link" onClick={() => setOpen(false)}>
                Torna allo shopping
              </Button>
            </div>
          ) : (
            <div className="flex flex-col">
              {items.map((item) => (
                <CartItem key={item.productId} item={item} />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="flex-col border-t pt-6">
            <div className="flex w-full justify-between mb-4">
              <span className="text-base font-semibold">Subtotale</span>
              <span className="text-base font-semibold">{formattedTotal}</span>
            </div>
            <Button className="w-full" size="lg" onClick={handleCheckout}>
              Vai al Checkout
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
