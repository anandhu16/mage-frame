"use client";

import Image from "next/image";

export default function BackgroundLayout({ children, isHighlighter = false }: { children: React.ReactNode, isHighlighter?: boolean }) {
    return <div className="w-full">
        <div className={`relative h-screen flex justify-center items-center`}>

            <div className={`absolute inset-0`}>
                <div className={`absolute inset-0 -z-10 h-full w-full bg-darkPrimary bg-[linear-gradient(to_right,#74747410_1px,transparent_1px),linear-gradient(to_bottom,#74747410_1px,transparent_1px)] bg-[size:2rem_2rem]`}></div>
            </div>
            <div className="absolute inset-0 left-[18%] -z-10 flex w-2/3 h-full flex-col items-center justify-center px-4 bg-[radial-gradient(circle_at_center,black,transparent)]">
                <div className={`absolute inset-0`}>
                    <div className={`absolute inset-0 -z-20 h-full w-full ${isHighlighter ? 'bg-[size:14px_24px] [&>div]:absolute [&>div]:left-0 [&>div]:right-0 [&>div]:top-0 [&>div]:-z-20 [&>div]:m-auto [&>div]:h-[400px] [&>div]:w-[400px] [&>div]:rounded-full [&>div]:bg-[#C95792] [&>div]:opacity-60 [&>div]:blur-[100px] [&>div]:bg-[size:14px_24px]' : ''}`}>
                        <div></div>

                    </div>
                </div>


            </div>
            <div className={`relative z-10 flex w-2/3 h-full flex-col items-center justify-center px-4`}>
                {children}
            </div>
        </div>
    </div >
}
