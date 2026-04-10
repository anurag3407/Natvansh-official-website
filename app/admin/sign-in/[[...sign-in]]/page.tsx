import { SignIn } from "@clerk/nextjs";

export default function AdminSignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-[url('/images/bg_grunge_purple.png')] bg-cover">
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 text-center space-y-8">
        <div>
          <img src="/images/logo.png" alt="Natvansh" className="w-24 h-24 mx-auto object-contain mb-4" />
          <h1 className="text-5xl font-anton text-white uppercase tracking-wider drop-shadow-[4px_4px_0_#000]">
            नटवंश
          </h1>
          <p className="text-sm font-inter font-bold text-zinc-400 mt-2 uppercase tracking-widest">
            Admin Access · Drama & Film Club
          </p>
        </div>
        <div className="flex justify-center">
          <SignIn
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-zinc-900 border-2 border-zinc-700 shadow-[8px_8px_0_#000]",
                headerTitle: "text-white font-bold",
                headerSubtitle: "text-zinc-400",
                formButtonPrimary: "bg-[#FFFF00] text-black font-bold hover:bg-white border-2 border-black",
                formFieldInput: "bg-black border-2 border-zinc-700 text-white",
                formFieldLabel: "text-zinc-400",
                footerActionLink: "text-[#FF007F]",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
