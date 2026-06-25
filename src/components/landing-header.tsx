import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
} from '@clerk/nextjs'

export default function LandingHeader() {
    return (
        <header className="flex justify-between items-center py-4 px-10">
            <div className="flex items-center gap-2 font-bold text-xl">
                <Image src="/logo.png" alt="Noto Logo" width={40} height={40} />
                Noto
            </div>

            <div>
                <SignedOut>
                    <SignInButton mode="modal" fallbackRedirectUrl={"/pages"}>
                        <Button className="cursor-pointer mr-2 h-[30px] rounded-[5px] " variant="ghost">
                            Log in
                        </Button>
                    </SignInButton>

                    <SignUpButton mode="modal" fallbackRedirectUrl={"/pages"}>
                        <Button className="cursor-pointer h-[30px] rounded-[5px]">
                            Get Noto free
                        </Button>
                    </SignUpButton>
                </SignedOut>

                <SignedIn>
                    <Link href="/pages" replace>
                        <Button className="cursor-pointer h-[30px] rounded-[5px]">
                            Get started →
                        </Button>
                    </Link>
                </SignedIn>

            </div>
        </header>
    )
}
