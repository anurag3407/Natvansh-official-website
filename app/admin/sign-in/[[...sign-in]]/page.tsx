export default function AdminSignInPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center doodle-bg"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="text-center space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gradient mb-2">नटवंश</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Admin Access · Drama & Film Club
          </p>
        </div>
        <div className="admin-card max-w-sm mx-auto p-8 rounded-2xl">
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            Clerk authentication will be enabled once API keys are configured.
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Update <code className="px-1 py-0.5 rounded" style={{ background: "var(--bg-glass)" }}>.env.local</code> with your Clerk keys and
            uncomment the ClerkProvider in <code className="px-1 py-0.5 rounded" style={{ background: "var(--bg-glass)" }}>layout.tsx</code>
          </p>
        </div>
      </div>
    </div>
  );
}
