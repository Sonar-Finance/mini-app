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

export default function MobileMenu({ trigger }: { trigger: React.ReactNode }) {
  const { signOut } = useWorldAuth()
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Manage Profile</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Welcome to Sonar Finance. This is a demo showcasing the future of
          prediction markets on Worldchain.
        </AlertDialogDescription>
        <div className="grid gap-3">
          <AlertDialogClose asChild>
            <Button onClick={signOut} variant="secondary">
              Logout
            </Button>
          </AlertDialogClose>
          <AlertDialogClose asChild>
            <Button>Accept & Close</Button>
          </AlertDialogClose>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
