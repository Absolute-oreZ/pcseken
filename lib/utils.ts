import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fileToDataUrl(
  file: File
): Promise<string> {
  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);

  return `data:${file.type};base64,${buffer.toString(
    'base64'
  )}`;
}