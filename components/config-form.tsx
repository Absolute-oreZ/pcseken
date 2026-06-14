'use client';

import Image from 'next/image';
import { useEffect, useState, useTransition } from 'react';
import { updateWebappContentsAction } from '@/app/admin/(protected)/config/action';
import { toast } from "sonner"

type Props = {
  settings: {
    shopName: string;
    whatsappNumber: string;
    address: string;
    googleMapUrl: string;
    logoImage: string | null;
  } | null;
};

export function ConfigForm({ settings }: Props) {
  const [isPending, startTransition] = useTransition();

  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    shopName: settings?.shopName ?? '',
    whatsappNumber: settings?.whatsappNumber ?? '',
    address: settings?.address ?? '',
    googleMapUrl: settings?.googleMapUrl ?? '',
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(
    settings?.logoImage ?? null
  );

  const [removeLogo, setRemoveLogo] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    const changed =
      form.shopName !== (settings?.shopName ?? '') ||
      form.whatsappNumber !== (settings?.whatsappNumber ?? '') ||
      form.address !== (settings?.address ?? '') ||
      form.googleMapUrl !== (settings?.googleMapUrl ?? '') ||
      logoFile !== null ||
      removeLogo;

    setDirty(changed);
  }, [form, logoFile, removeLogo, settings]);

  function onFile(file: File | null) {
    setLogoFile(file);
    setRemoveLogo(false);

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setLogoPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function save() {
    const fd = new FormData();

    fd.append('shopName', form.shopName);
    fd.append('whatsappNumber', form.whatsappNumber);
    fd.append('address', form.address);
    fd.append('googleMapUrl', form.googleMapUrl);

    if (removeLogo) fd.append('removeLogo', '1');
    if (logoFile) fd.append('logo', logoFile);

    startTransition(async () => {
      const res = await updateWebappContentsAction(fd);

      if (res.ok) {
        toast.success("Configuration updated successfully");

        setIsEditing(false);
        setLogoFile(null);
        setRemoveLogo(false);
      } else {
        toast.error(res.message || "Failed to update configuration");
      }
    });
  }

  return (
    <div className="space-y-6 rounded-xl border p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">App Configuration</h2>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="rounded bg-black px-4 py-2 text-sm text-white"
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="rounded border px-4 py-2 text-sm"
            >
              Cancel
            </button>

            {dirty && (
              <button
                onClick={save}
                disabled={isPending}
                className="rounded bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
              >
                {isPending ? "Saving..." : "Save Changes"}
              </button>
            )}
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Shop Name">
          <Input
            disabled={!isEditing}
            value={form.shopName}
            onChange={(v) =>
              setForm((p) => ({ ...p, shopName: v }))
            }
          />
        </Field>

        <Field label="WhatsApp Number">
          <Input
            disabled={!isEditing}
            value={form.whatsappNumber}
            onChange={(v) =>
              setForm((p) => ({ ...p, whatsappNumber: v }))
            }
          />
        </Field>

        <Field label="Google Map URL" full>
          <Input
            disabled={!isEditing}
            value={form.googleMapUrl}
            onChange={(v) =>
              setForm((p) => ({ ...p, googleMapUrl: v }))
            }
          />
        </Field>
      </div>

      <Field label="Address">
        <textarea
          disabled={!isEditing}
          value={form.address}
          onChange={(e) =>
            setForm((p) => ({ ...p, address: e.target.value }))
          }
          className="h-24 w-full rounded-lg border p-3 text-sm disabled:opacity-50"
        />
      </Field>

      <div className="space-y-2">
        <label className="text-sm font-medium">Logo</label>

        <div className="flex items-center gap-4">
          <label
            className={`relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed transition ${
              isEditing
                ? "hover:border-black"
                : "opacity-50 cursor-not-allowed"
            }`}
          >
            {logoPreview && !removeLogo ? (
              <>
                <Image
                  src={logoPreview}
                  alt="logo"
                  fill
                  className="rounded-xl object-cover"
                  unoptimized
                />

                {isEditing && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setLogoPreview(null);
                      setLogoFile(null);
                      setRemoveLogo(true);
                    }}
                    className="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 text-xs text-white"
                  >
                    x
                  </button>
                )}
              </>
            ) : (
              <span className="text-xs text-gray-500">
                Upload
              </span>
            )}

            {isEditing && (
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) =>
                  onFile(e.target.files?.[0] ?? null)
                }
              />
            )}
          </label>

          <div className="text-xs text-gray-500">
            Click box to upload logo<br />
            Recommended: square PNG
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "md:col-span-2 space-y-1" : "space-y-1"}>
      <label className="text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}

function Input({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <input
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border p-2 text-sm disabled:opacity-50"
    />
  );
}