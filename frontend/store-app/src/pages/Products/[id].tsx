import { useParams } from 'react-router-dom';
import { useProductQuery } from '@/queries/useProductsQuery';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '@/stores/cartStore';
import { useState } from 'react';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation(['products', 'common']);
  const { data: product, isLoading } = useProductQuery(id!);
  const addItem = useCartStore((state) => state.addItem);
  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Caricamento...</div>;
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Prodotto non trovato.</div>;
  }

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      vendorId: product.vendorId,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0] || 'https://placehold.co/400x400?text=No+Image',
    });
  };

  const formattedPrice = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(product.price);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            <img
              src={product.images[selectedImage] || 'https://placehold.co/600x600?text=No+Image'}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex gap-4 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`h-20 w-20 shrink-0 overflow-hidden rounded-md border-2 ${
                  selectedImage === index ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img src={image} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="mt-2 text-2xl font-bold text-primary">{formattedPrice}</p>
          </div>

          <div className="prose prose-sm text-muted-foreground">
            <p>{product.description}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Stato:</span>
              <span className={product.stockQuantity > 0 ? 'text-green-600' : 'text-destructive'}>
                {product.stockQuantity > 0 ? 'Disponibile' : 'Esaurito'}
              </span>
            </div>
            
            <Button
              size="lg"
              className="w-full md:w-auto"
              disabled={product.stockQuantity === 0}
              onClick={handleAddToCart}
            >
              {t('common:actions.add')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
