"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import BackgroundLayout from "@/components/molecules/BackgroundLayout";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {

  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("email", email);
    router.push("/signup");
  }

  return (
    <BackgroundLayout isHighlighter={true}>
      <div className="w-full h-full">
        <div className="flex flex-col items-center justify-center h-screen w-full">
          <div className="text-7xl font-bold">Welcome to Mage</div>
          <div className="text-xl text-gray-400 text-center mt-2 max-w-2xl">
            Unlock your productivity, the intelligent To-Do task manager designed to help you stay focused on your goals.
          </div>

          <Card className="mt-32 border-slate-800 w-2/3 mx-auto shadow-[0px_0px_32px_10px_rgba(206,71,255,0.1)] [background:linear-gradient(45deg,#1a2433,theme(colors.black)_50%,#1a2433)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.gray.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.pink.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.gray.600/.48))_border-box] rounded-2xl border border-transparent animate-border bg-gradient-to-br from-neutral-200 via-neutral-600 to-neutral-400">
            <CardContent className="px-8 py-6">
              <div className="w-full flex flex-col gap-2 relative">
                <div className="text-sm font-bold">
                  Enter your email to proceed to the app
                </div>

                <form onSubmit={handleLogin}>
                <div className="w-full flex items-center gap-2">
                  <input type="text" className="w-[90%] px-4 py-3 rounded-md bg-white text-black input text-sm" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <button className="px-6 py-2 rounded-md bg-neutral-900 text-sm font-bold text-white shadow-lg outline-neutral-900" onClick={handleLogin}>
                    Login
                    </button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>


      </div >
    </BackgroundLayout >
  );
}
