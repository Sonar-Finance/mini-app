"use client"

import { useWorldAuth } from "@radish-la/world-auth"
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@worldcoin/mini-apps-ui-kit-react"
import Link from "next/link"

export default function MobileMenu({ trigger }: { trigger: React.ReactNode }) {
  const { signOut, address } = useWorldAuth()
  if (!address) return trigger

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Manage Wallet</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <Link
            className="underline-offset-4 font-semibold underline"
            href="https://sonar.trading"
            target="_blank"
          >
            Sonar Finance:
          </Link>{" "}
          Shaping the future of prediction markets on Worldchain.{" "}
        </AlertDialogDescription>
        <div className="grid mt-8 gap-3">
          <AlertDialogClose asChild>
            <Button onClick={signOut} variant="secondary">
              Disconnect
            </Button>
          </AlertDialogClose>
          <AlertDialogClose asChild>
            <Button>Back to App</Button>
          </AlertDialogClose>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
