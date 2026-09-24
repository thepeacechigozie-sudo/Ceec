import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-9999 h-dvh w-full bg-coffee-dark flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-coffee-tan animate-spin" />
    </div>
  );
} 