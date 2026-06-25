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
        <header className="flex justify-between items-center p-4">
            <div className="font-bold">
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
