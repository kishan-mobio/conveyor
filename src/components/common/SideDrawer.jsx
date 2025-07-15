
"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";

/**
 * SideDrawer - A wrapper for a left-side drawer using Radix UI Sheet
 * @param {object} props
 * @param {boolean} props.open - Whether the drawer is open
 * @param {function} props.onClose - Function to call when closing
 * @param {React.ReactNode} props.children - Drawer content
 * @param {string} [props.className] - Optional className for SheetContent
 */
export default function SideDrawer({ open, onClose, children, className = "w-[400px] sm:w-[540px]" }) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className={`${className} overflow-y-auto p-4`}>
        {children}
      </SheetContent>
    </Sheet>
  );
}
