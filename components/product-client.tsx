'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import {
    createProduct,
    updateProduct,
    deleteProduct,
} from '@/app/admin/(protected)/products/action';
import { FaImage } from 'react-icons/fa';
import { toast } from 'sonner';

type Product = {
    id: number;
    name: string;
    description: string | null;
    price: string | null;
    image: string | null;
    isFeatured: boolean | null;
};

export function ProductClient({
    initialProducts,
}: {
    initialProducts: Product[];
}) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    const [editing, setEditing] = useState<Product | null>(null);

    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        isFeatured: false,
    });

    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    function reset() {
        setForm({
            name: '',
            description: '',
            price: '',
            isFeatured: false,
        });
        setImage(null);
        setPreview(null);
        setEditing(null);
    }

    function onFile(file: File | null) {
        setImage(file);
        if (!file) return setPreview(null);

        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
    }

    function submitCreate() {
        const fd = new FormData();
        fd.append('name', form.name);
        fd.append('description', form.description);
        fd.append('price', form.price);
        fd.append('isFeatured', String(form.isFeatured));

        if (image) fd.append('image', image);

        startTransition(async () => {
            await createProduct(fd);
            toast.success("Product created successfully");
            setCreateOpen(false);
            reset();
            router.refresh();
        });
    }

    function submitUpdate() {
        if (!editing) return;

        const fd = new FormData();
        fd.append('id', String(editing.id));
        fd.append('name', form.name);
        fd.append('description', form.description);
        fd.append('price', form.price);
        fd.append('isFeatured', String(form.isFeatured));

        if (image) fd.append('image', image);

        startTransition(async () => {
            await updateProduct(fd);
            toast.success("Product updated successfully");
            setEditOpen(false);
            reset();
            router.refresh();
        });
    }

    function openEdit(p: Product) {
        setEditing(p);
        setForm({
            name: p.name,
            description: p.description ?? '',
            price: p.price ?? '',
            isFeatured: p.isFeatured ?? false,
        });
        setPreview(p.image ?? null);
        setEditOpen(true);
    }

    function handleDelete(id: number) {
        startTransition(async () => {
            await deleteProduct(id);
            toast.success("Product deleted successfully");
            router.refresh();
        });
    }

    return (
        <div className="space-y-6">

            {/* HEADER */}
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Products</h1>

                <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                    <DialogTrigger asChild>
                        <Button>Add Product</Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create Product</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-3">
                            <input
                                className="w-full border p-2 rounded"
                                placeholder="Name"
                                value={form.name}
                                onChange={(e) =>
                                    setForm((p) => ({ ...p, name: e.target.value }))
                                }
                            />

                            <textarea
                                className="w-full border p-2 rounded"
                                placeholder="Description"
                                value={form.description}
                                onChange={(e) =>
                                    setForm((p) => ({
                                        ...p,
                                        description: e.target.value,
                                    }))
                                }
                            />

                            <input
                                className="w-full border p-2 rounded"
                                placeholder="Price"
                                value={form.price}
                                onChange={(e) =>
                                    setForm((p) => ({ ...p, price: e.target.value }))
                                }
                            />

                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={form.isFeatured}
                                    onChange={(e) =>
                                        setForm((p) => ({
                                            ...p,
                                            isFeatured: e.target.checked,
                                        }))
                                    }
                                />
                                Featured
                            </label>

                            <input
                                type="file"
                                onChange={(e) =>
                                    onFile(e.target.files?.[0] ?? null)
                                }
                            />

                            {preview && (
                                <div className="relative h-32 w-32">
                                    <Image
                                        src={preview}
                                        alt=""
                                        fill
                                        className="object-cover rounded"
                                        unoptimized
                                    />
                                </div>
                            )}

                            <Button onClick={submitCreate} disabled={isPending}>
                                Create
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* GRID */}
            <div className="grid md:grid-cols-3 gap-4">
                {initialProducts.map((p) => (
                    <div key={p.id} className="border rounded-lg p-3 space-y-2">

                        {p.image ? (
                            <div className="relative h-40 w-full">
                                <Image
                                    src={p.image}
                                    alt={p.name}
                                    fill
                                    className="object-cover rounded"
                                    unoptimized
                                />
                            </div>
                        ) : (
                            <div className="h-40 w-full flex items-center justify-center rounded bg-gray-100 text-gray-400">
                                <FaImage className="text-4xl" />
                            </div>
                        )}

                        <div className="flex justify-between">
                            <h3 className="font-semibold">{p.name}</h3>
                            {p.isFeatured && (
                                <span className="text-xs flex items-center bg-yellow-400 px-2 rounded">
                                    Featured
                                </span>
                            )}
                        </div>

                        <p className="text-sm text-gray-500">
                            {p.description}
                        </p>

                        <p className="font-medium">
                            RM {Number(p.price ?? 0).toFixed(2)}
                        </p>

                        <div className="flex gap-2">

                            <Button
                                variant="outline"
                                onClick={() => openEdit(p)}
                            >
                                Edit
                            </Button>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive">
                                        Delete
                                    </Button>
                                </AlertDialogTrigger>

                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Delete this product?
                                        </AlertDialogTitle>
                                    </AlertDialogHeader>

                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>

                                        <AlertDialogAction
                                            onClick={() => handleDelete(p.id)}
                                        >
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                        </div>
                    </div>
                ))}
            </div>

            {/* EDIT SHEET */}
            <Sheet open={editOpen} onOpenChange={setEditOpen}>
                <SheetContent className="space-y-4">
                    <SheetHeader>
                        <SheetTitle>Edit Product</SheetTitle>
                    </SheetHeader>

                    <input
                        className="w-full border p-2 rounded"
                        value={form.name}
                        onChange={(e) =>
                            setForm((p) => ({ ...p, name: e.target.value }))
                        }
                    />

                    <textarea
                        className="w-full border p-2 rounded"
                        value={form.description}
                        onChange={(e) =>
                            setForm((p) => ({
                                ...p,
                                description: e.target.value,
                            }))
                        }
                    />

                    <input
                        className="w-full border p-2 rounded"
                        value={form.price}
                        onChange={(e) =>
                            setForm((p) => ({ ...p, price: e.target.value }))
                        }
                    />

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={form.isFeatured}
                            onChange={(e) =>
                                setForm((p) => ({
                                    ...p,
                                    isFeatured: e.target.checked,
                                }))
                            }
                        />
                        Featured
                    </label>

                    <input type="file" onChange={(e) =>
                        onFile(e.target.files?.[0] ?? null)
                    } />

                    {preview && (
                        <div className="relative h-32 w-32">
                            <Image
                                src={preview}
                                alt=""
                                fill
                                className="rounded object-cover"
                                unoptimized
                            />
                        </div>
                    )}

                    <Button onClick={submitUpdate} disabled={isPending}>
                        Save Changes
                    </Button>
                </SheetContent>
            </Sheet>

        </div>
    );
}