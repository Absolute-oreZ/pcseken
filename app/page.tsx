import Image from "next/image";
import Link from "next/link";

import {
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPrint,
  FaLayerGroup,
  FaLaptop,
  FaTools,
  FaWrench,
  FaCog,
  FaExchangeAlt,
  FaDesktop,
} from "react-icons/fa";

import {
  SiAcer,
  SiAsus,
  SiLenovo,
  SiHp,
  SiMsi,
  SiDell,
} from "react-icons/si";

import { getFeaturedProducts } from '@/lib/queries';
import LogoLoop, { LogoItem } from "@/components/logo-loop";
import SpotlightCard from "@/components/spotlight-card";
import PixelBlast from "@/components/pixel-blast";
import { getWebappContents } from "@/lib/queries";

const SERVICES = [
  {
    title: "Print & Fotostat",
    icon: <FaPrint />,
    color: "text-blue-400",
    description:
      "Cetak dokumen dan fotostat dengan pantas serta kualiti terbaik.",
  },
  {
    title: "Laminasi Dokumen",
    icon: <FaLayerGroup />,
    color: "text-cyan-400",
    description:
      "Laminasi dokumen penting untuk perlindungan tahan lama.",
  },
  {
    title: "Jual Laptop / PC / Aksesori",
    icon: <FaLaptop />,
    color: "text-indigo-400",
    description:
      "Pelbagai pilihan laptop, PC dan aksesori berkualiti.",
  },
  {
    title: "Servis Laptop & PC",
    icon: <FaTools />,
    color: "text-emerald-400",
    description:
      "Servis rutin dan penyelenggaraan sistem komputer anda.",
  },
  {
    title: "Repair Laptop & PC",
    icon: <FaWrench />,
    color: "text-orange-400",
    description:
      "Baiki masalah hardware & software dengan pantas dan profesional.",
  },
  {
    title: "Trade In Laptop",
    icon: <FaExchangeAlt />,
    color: "text-purple-400",
    description:
      "Tukar laptop lama anda dengan harga yang berpatutan.",
  },
  {
    title: "Baiki Printer",
    icon: <FaCog />,
    color: "text-pink-400",
    description:
      "Pembaikan printer rumah dan pejabat dengan kepakaran.",
  },
  {
    title: "Bina Custom PC",
    icon: <FaDesktop />,
    color: "text-red-400",
    description:
      "Rakit PC custom mengikut keperluan gaming atau kerja profesional.",
  },
  {
    title: "Pembersihan Peranti",
    icon: <FaTools />,
    color: "text-teal-400",
    description:
      "Pembersihan dalaman & luaran untuk laptop, PC dan aksesori anda.",
  },
];

const PARTNER_LOGOS: LogoItem[] = [
  { node: <SiAcer />, ariaLabel: "Acer" },
  { node: <SiAsus />, ariaLabel: "ASUS" },
  { node: <SiLenovo />, ariaLabel: "Lenovo" },
  { node: <SiHp />, ariaLabel: "HP" },
  { node: <SiMsi />, ariaLabel: "MSI" },
  { node: <SiDell />, ariaLabel: "Dell" },
];

export default async function HomePage() {
  const content = await getWebappContents();
  const featuredProducts = await getFeaturedProducts();

  const shopName = content?.shopName ?? "PCSeken";

  const whatsapp =
    content?.whatsappNumber
      ? `https://wa.me/${content.whatsappNumber.replace(/\D/g, "")}`
      : "#";

  const address = content?.address ?? "Address not set";

  console.log("Webapp Contents:", content);

  const mapUrl = content?.googleMapUrl ?? "";

  const logo =
    content?.logoImage ?? "/images/pcseke_logo.png";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: shopName,
    image: logo.startsWith("data:") ? undefined : logo,
    url: process.env.NEXT_PUBLIC_APP_URL,
    telephone: content?.whatsappNumber ?? "",
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressCountry: "MY",
    },
    priceRange: "$$",
  };

  return (
    <main className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <section className="relative w-full min-h-150 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <PixelBlast
            className="w-full h-full"
            variant="diamond"
            pixelSize={2}
            color="#B19EEF"
            liquid
            liquidStrength={0.08}
            pixelSizeJitter={1.25}
            enableRipples
            rippleIntensityScale={1.2}
            rippleThickness={0.1}
            rippleSpeed={0.25}
            edgeFade={0.2}
          />
        </div>

        <div className="container relative z-10 mx-auto py-20 px-5 md:px-15 lg:px-25 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={logo}
                alt={shopName}
                width={120}
                height={80}
                priority
                unoptimized={logo.startsWith("data:")}
              />
            </div>

            <p className="text-gray-100 text-lg mb-6 leading-relaxed">
              Pusat perkhidmatan komputer & laptop di{" "}
              <strong>{address}</strong>
            </p>

            <Link
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 font-medium hover:bg-green-600 transition shadow-lg"
            >
              <FaWhatsapp />
              Hubungi WhatsApp
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/images/image-1.jpeg"
              alt="Kedai Repair Laptop"
              width={500}
              height={350}
              className="rounded-xl object-cover h-full"
            />
            <Image
              src="/images/image-2.jpeg"
              alt="Custom PC Gaming"
              width={500}
              height={350}
              className="rounded-xl object-cover h-full"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-bold mb-8 text-slate-900">
            Jenama Rakan Kongsi
          </h2>
          <LogoLoop
            logos={PARTNER_LOGOS}
            speed={90}
            gap={56}
            logoHeight={36}
            pauseOnHover
            scaleOnHover
            fadeOut
            className="mx-auto text-slate-700"
          />
        </div>
      </section>

      <section className="px-4 md:px-12 lg:px-20 bg-slate-50 py-20">
        <div className="container mx-auto">
          <h2 className="text-center text-3xl font-bold mb-12 text-slate-900">
            Perkhidmatan Kami
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center">
            {SERVICES.map((service) => (
              <SpotlightCard
                key={service.title}
                spotlightColor="rgba(0, 229, 255, 0.25)"
                className="min-h-45 flex flex-col justify-center"
              >
                <div className="flex items-start gap-4">
                  <div className={`text-3xl ${service.color} mt-1`}>
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-300">
                      {service.description}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 md:px-12 lg:px-20 py-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-center text-3xl font-bold mb-10 text-slate-900">
            Produk Pilihan
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.length === 0 && (
              <p className="text-center text-gray-500 col-span-full">
                Tiada produk featured buat masa ini
              </p>
            )}

            {featuredProducts.map((p) => (
              <div
                key={p.id}
                className="border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition"
              >
                {p.image ? (
                  <div className="relative h-48 w-full">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="h-48 w-full flex items-center justify-center bg-gray-100 text-gray-400">
                    <span className="text-sm">No image</span>
                  </div>
                )}

                <div className="p-4 space-y-2">
                  <h3 className="font-semibold">{p.name}</h3>

                  {p.description && (
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {p.description}
                    </p>
                  )}

                  <p className="font-medium">
                    RM {Number(p.price ?? 0).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 md:px-12 lg:px-20 bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold mb-12">
            Lokasi & Hubungi Kami
          </h2>
          <div className="grid gap-10 lg:grid-cols-2 items-stretch">
            <div className="w-full min-h-100 rounded-xl overflow-hidden border border-slate-700">
              <iframe
                title="Google Maps"
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "450px" }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex flex-col gap-8">
              <div className="w-full h-64 relative rounded-xl overflow-hidden border border-slate-700">
                <Image
                  src="/images/shop.jpeg"
                  alt="Shop"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex gap-4">
                <FaMapMarkerAlt className="text-xl mt-1 text-slate-300" />
                <address className="text-slate-300 not-italic leading-relaxed">
                  {address}
                </address>
              </div>

              <Link
                href={whatsapp}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 font-medium text-white hover:bg-green-600 transition w-fit shadow-md"
              >
                <FaWhatsapp />
                WhatsApp Kami Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}