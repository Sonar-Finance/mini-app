"use client"

import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@worldcoin/mini-apps-ui-kit-react"

export default function MobileMenu({
  trigger,
  enabled = true,
}: {
  trigger: React.ReactNode
  enabled?: boolean
}) {
  if (!enabled) return trigger
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Your Profile</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
        <div className="grid gap-3">
          <AlertDialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </AlertDialogClose>
          <Button>Continue</Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
