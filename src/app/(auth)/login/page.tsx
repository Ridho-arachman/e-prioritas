import { LoginForm } from "@/components/login-form";
import { MoveLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-gray-50">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <MoveLeftIcon /> HOME 🏠
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          width={900}
          height={100}
          src="/login/image.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </>
  );
}
