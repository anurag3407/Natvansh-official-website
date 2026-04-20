import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  // No authenticated user — redirect to sign-in
  if (!user) {
    redirect("/admin/sign-in");
  }

  // Check if the user's email is in the allowed list
  const allowedEmails = (process.env.ALLOWED_ADMIN_EMAILS || "")
    .replace(/"/g, "") // strip any surrounding quotes
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  const userEmail = user.primaryEmailAddress?.emailAddress;

  if (!userEmail || !allowedEmails.includes(userEmail)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
        <div className="max-w-md w-full bg-black border-4 border-zinc-800 p-8 text-center shadow-[8px_8px_0_var(--neon-pink)]">
          <h2 className="text-3xl font-anton text-white uppercase mb-4 text-[var(--neon-pink)]">Access Denied</h2>
          <p className="text-zinc-400 font-inter font-bold mb-8">
            The account associated with <span className="text-[var(--neon-yellow)]">{userEmail}</span> is not authorized to access the admin panel.
          </p>
          <div className="flex justify-center">
            <SignOutButton redirectUrl="/">
              <button className="px-6 py-3 bg-[var(--neon-green)] text-black font-anton uppercase text-lg border-2 border-black shadow-[4px_4px_0_#000] hover:translate-y-1 hover:shadow-[2px_2px_0_#000] transition-all">
                Sign Out
              </button>
            </SignOutButton>
          </div>
        </div>
      </div>
    );
  }

  return <AdminSidebar>{children}</AdminSidebar>;
}
