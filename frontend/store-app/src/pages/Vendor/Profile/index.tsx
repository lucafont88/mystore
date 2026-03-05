import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { vendorProfileService } from '@/services/vendorProfile.service';

const vendorProfileSchema = z.object({
  firstName: z.string().min(1, 'Nome richiesto'),
  lastName: z.string().min(1, 'Cognome richiesto'),
  dateOfBirth: z.string().min(1, 'Data di nascita richiesta'),
  gender: z.string().optional(),
  fiscalCode: z.string().min(11, 'Codice fiscale non valido').max(16, 'Codice fiscale non valido'),
  businessName: z.string().min(1, 'Ragione sociale richiesta'),
  vatNumber: z.string().optional(),
  contactEmail: z.string().email('Email non valida'),
  phoneNumber: z.string().min(1, 'Telefono richiesto'),
  street: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
});

type VendorProfileFormInput = z.infer<typeof vendorProfileSchema>;

export default function VendorProfilePage() {
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: profile, isLoading } = useQuery({
    queryKey: ['vendor-profile'],
    queryFn: () => vendorProfileService.getProfile(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VendorProfileFormInput>({
    resolver: zodResolver(vendorProfileSchema),
  });

  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.firstName,
        lastName: profile.lastName,
        dateOfBirth: profile.dateOfBirth?.slice(0, 10) ?? '',
        gender: profile.gender ?? '',
        fiscalCode: profile.fiscalCode,
        businessName: profile.businessName,
        vatNumber: profile.vatNumber ?? '',
        contactEmail: profile.contactEmail,
        phoneNumber: profile.phoneNumber,
        street: profile.address?.street ?? '',
        city: profile.address?.city ?? '',
        postalCode: profile.address?.postalCode ?? '',
        country: profile.address?.country ?? '',
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data: VendorProfileFormInput) => {
    setIsSubmitting(true);
    setSaveError(null);
    setSaved(false);
    try {
      await vendorProfileService.saveProfile({
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        fiscalCode: data.fiscalCode,
        businessName: data.businessName,
        vatNumber: data.vatNumber,
        contactEmail: data.contactEmail,
        phoneNumber: data.phoneNumber,
        address: {
          street: data.street,
          city: data.city,
          postalCode: data.postalCode,
          country: data.country,
        },
      });
      setSaved(true);
    } catch (err: any) {
      setSaveError(err.message || 'Errore nel salvataggio del profilo');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-muted-foreground">Caricamento...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">I miei dati</h1>
        <p className="text-muted-foreground text-sm mt-1">Visualizza e modifica la tua anagrafica.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dati anagrafici</CardTitle>
          <CardDescription>Dati personali e aziendali del tuo account venditore</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Nome *</label>
                <Input {...register('firstName')} />
                {errors.firstName && <p className="text-xs text-destructive">{errors.firstName.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Cognome *</label>
                <Input {...register('lastName')} />
                {errors.lastName && <p className="text-xs text-destructive">{errors.lastName.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Data di nascita *</label>
                <Input type="date" {...register('dateOfBirth')} />
                {errors.dateOfBirth && <p className="text-xs text-destructive">{errors.dateOfBirth.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Genere</label>
                <Input placeholder="M / F / altro" {...register('gender')} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Codice Fiscale *</label>
                <Input placeholder="RSSMRA90A15H501Z" {...register('fiscalCode')} />
                {errors.fiscalCode && <p className="text-xs text-destructive">{errors.fiscalCode.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Ragione Sociale *</label>
                <Input {...register('businessName')} />
                {errors.businessName && <p className="text-xs text-destructive">{errors.businessName.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Partita IVA</label>
                <Input placeholder="Opzionale" {...register('vatNumber')} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Telefono *</label>
                <Input placeholder="+393331234567" {...register('phoneNumber')} />
                {errors.phoneNumber && <p className="text-xs text-destructive">{errors.phoneNumber.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Email di contatto *</label>
              <Input type="email" {...register('contactEmail')} />
              {errors.contactEmail && <p className="text-xs text-destructive">{errors.contactEmail.message}</p>}
            </div>

            <div className="border-t pt-4">
              <p className="text-sm font-medium mb-3">Indirizzo</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium leading-none">Via / Piazza</label>
                  <Input placeholder="Via Roma 1" {...register('street')} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">Città</label>
                  <Input {...register('city')} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">CAP</label>
                  <Input {...register('postalCode')} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">Paese</label>
                  <Input placeholder="IT" {...register('country')} />
                </div>
              </div>
            </div>

            {saveError && <p className="text-sm text-destructive">{saveError}</p>}

            {saved && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                Dati aggiornati con successo.
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvataggio...' : 'Salva modifiche'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
