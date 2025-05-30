"use client"

import BackgroundLayout from "@/components/molecules/BackgroundLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/atoms/Card";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import { Label } from "@radix-ui/react-label";
import { useToast } from "@/contexts/ToastContext";
import Image from "next/image";
import { userService } from "@/services/api";

export default function SignupPage() {
    const { error, success } = useToast();
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    useEffect(() => {
        const email = localStorage.getItem("email");
        if (email) {
            setEmail(email);
            setName(email.split("@")[0]);
        } else {
            error("Please login to continue.");
            setErrorMessage("Please login to continue.");
            setIsSubmitting(false);
            setTimeout(() => {
                router.push("/");
            }, 3000);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage(null);

        if (name === "" || email === "" || password === "") {
            error("Please fill in all fields.");
            setErrorMessage("Please fill in all fields.");
            setIsSubmitting(false);
            return;
        }

        try {
            const user = await userService.register({
                name,
                email,
                password
            });

            console.log(user);
            if (user.data.token) {
                localStorage.setItem("token", user.data.token);

                success("Registration successful! Please login.");
                localStorage.setItem("email", email);

                setTimeout(() => {
                    router.push("/board");
                }, 3000);
            }

            // router.push("/login");
        } catch (err: any) {
            const message = err.response?.data?.error || "Failed to register.";
            error(message);
            setErrorMessage(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <BackgroundLayout>
            <div className="flex flex-col items-center justify-center min-h-screen w-full px-4">
                <Card className="w-[95%] sm:w-[80%] md:w-[70%] lg:w-2/5 [background:linear-gradient(45deg,#172033,theme(colors.black)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.gray.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.pink.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.gray.600/.48))_border-box] rounded-2xl border border-transparent animate-border bg-gradient-to-br from-neutral-800 via-neutral-950 to-neutral-900">
                    <CardHeader className="flex flex-col items-center justify-center gap-4 px-4 md:px-6">
                        <Image
                            src={`https://logo.clearbit.com/${email.split("@")[1]}?format=png&size=128&fallback=monogram&retina=true`}
                            alt="logo"
                            width={40}
                            height={40}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/default-logo.png';
                            }}
                        />
                        <h1 className="text-xl md:text-2xl font-medium text-center">Create your account</h1>
                    </CardHeader>
                    <CardContent className="px-4 md:px-6">
                        {errorMessage && <p className="text-red-500 mb-4 text-sm md:text-base">{errorMessage}</p>}
                        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-4">
                            <div>
                                <Label htmlFor="name" className="text-sm md:text-base">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={isSubmitting}
                                    className="text-sm md:text-base"
                                />
                            </div>
                            <div>
                                <Label htmlFor="email" className="text-sm md:text-base">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isSubmitting}
                                    className="text-sm md:text-base"
                                />
                            </div>
                            <div>
                                <Label htmlFor="password" className="text-sm md:text-base">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="********"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isSubmitting}
                                    className="text-sm md:text-base"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-sm md:text-base py-2 md:py-3"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Creating account..." : "Create account"}
                            </Button>
                        </form>
                        <div className="mt-4 text-center">
                            <p className="text-xs md:text-sm text-gray-400">
                                Already have an account?{" "}
                                <Link href="/login" className="text-indigo-400 hover:text-indigo-300">
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </BackgroundLayout>
    );
}