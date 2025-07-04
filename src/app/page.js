import { redirect } from "next/navigation";

export default function HomePage() {
  // Redirect to equipment page
  redirect("/equipment");
}
