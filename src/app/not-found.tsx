import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center">
        <h1 className="text-9xl font-black text-slate-100 mb-4">404</h1>
        <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">Page Not Found</h2>
        <p className="text-xl text-slate-500 mb-12 max-w-md mx-auto leading-relaxed">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Button className="rounded-full px-10 py-6 h-auto text-lg gap-2" asChild>
          <Link href="/">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
