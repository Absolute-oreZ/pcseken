import { db } from '@/db';
import { ConfigForm } from '@/components/config-form';

export default async function ConfigPage() {
  const settings =
    await db.query.webappContents.findFirst();

  const normalizedSettings = settings
    ? {
        shopName: settings.shopName ?? '',
        whatsappNumber:
          settings.whatsappNumber ?? '',
        address: settings.address ?? '',
        googleMapUrl:
          settings.googleMapUrl ?? '',
        logoImage:
          settings.logoImage ?? null,
      }
    : null;

  return (
    <ConfigForm settings={normalizedSettings} />
  );
}