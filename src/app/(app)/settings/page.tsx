"use client"
import {
  User,
  Palette,
  Bell,
  Globe,
  CreditCard,
  Database,
  ChevronRight,
  Upload,
  Shield,
  LogOut,
  Trash2,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { logoutAction } from "@/actions/auth.actions";
import { useRouter } from "next/navigation";

const settingsNav = [
  { id: "profile", label: "Profile", icon: User },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "integrations", label: "Integrations", icon: Globe },
  { id: "billing", label: "Plan & Billing", icon: CreditCard },
  { id: "data", label: "Data & Privacy", icon: Database },
];

export default function SettingsPage() {

  const router = useRouter()

  const handleLogout = async () => {
    await logoutAction().then((response) => {
      router.push('/login')
    })
  }

  return (
    <div className="flex gap-12 h-full max-w-6xl mx-auto">
      {/* Settings Nav */}
      <div className="w-64 shrink-0 space-y-1">
        <span className="flowos-label px-3 mb-4 block">Settings</span>
        {settingsNav.map((item) => (
          <button
            key={item.id}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-10 text-[14px] font-medium transition-all",
              item.id === "profile"
                ? "bg-brand/10 text-brand"
                : "text-text-3 hover:text-text-2 hover:bg-surface-3",
            )}
          >
            <item.icon className="size-4" />
            {item.label}
          </button>
        ))}
        <div className="pt-8 mt-8 border-t border-white/[0.07] space-y-1">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-10 text-[14px] font-medium text-text-3 hover:text-danger hover:bg-danger/5 transition-all">
            <LogOut className="size-4" />
            Sign Out
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-10 text-[14px] font-medium text-danger hover:bg-danger/10 transition-all">
            <Trash2 className="size-4" />
            Delete Account
          </button>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 space-y-12 pb-24">
        {/* Profile Section */}
        <section className="space-y-8">
          <div className="space-y-1">
            <h2 className="font-display text-[24px] font-bold text-text-1">
              Profile
            </h2>
            <p className="text-[14px] text-text-3">
              Manage your personal information and how others see you.
            </p>
          </div>

          <div className="flowos-card space-y-8">
            <div className="flex items-center gap-8">
              <div className="relative group">
                <div className="size-24 rounded-full bg-brand/20 flex items-center justify-center text-brand-light font-bold text-2xl border-2 border-dashed border-brand/40">
                  AS
                </div>
                <button className="absolute inset-0 size-full rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white">
                  <Upload className="size-6" />
                </button>
              </div>
              <div className="space-y-2">
                <h3 className="text-[16px] font-bold text-text-1">
                  Your Avatar
                </h3>
                <p className="text-[13px] text-text-3">
                  JPG, GIF or PNG. Max size of 800K.
                </p>
                <div className="flex gap-3">
                  <button className="flowos-shadcn-btn-secondary h-8 px-4 text-[12px] w-auto">
                    Upload
                  </button>
                  <button className="text-[12px] text-text-4 hover:text-danger transition-colors">
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-text-2 ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Arjun Singh"
                  className="flowos-shadcn-input"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-text-2 ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="arjun@example.com"
                  className="flowos-shadcn-input"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-text-2 ml-1">
                  Timezone
                </label>
                <select className="flowos-shadcn-input appearance-none">
                  <option>(GMT-08:00) Pacific Time</option>
                  <option>(GMT+00:00) London</option>
                  <option>(GMT+05:30) Mumbai</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-text-2 ml-1">
                  Language
                </label>
                <select className="flowos-shadcn-input appearance-none">
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.05] flex justify-end">
              <button className="flowos-shadcn-btn-primary w-auto px-8">
                Save Changes
              </button>
            </div>
          </div>
        </section>

        {/* Appearance Section */}
        <section className="space-y-8">
          <div className="space-y-1">
            <h2 className="font-display text-[24px] font-bold text-text-1">
              Appearance
            </h2>
            <p className="text-[14px] text-text-3">
              Customize how FlowOS looks on your device.
            </p>
          </div>

          <div className="flowos-card space-y-8">
            <div className="space-y-4">
              <label className="text-[12px] font-medium text-text-2 ml-1 uppercase tracking-wider">
                Theme
              </label>
              <div className="grid grid-cols-3 gap-4">
                {["Dark", "Light", "System"].map((theme) => (
                  <button
                    key={theme}
                    className={cn(
                      "flex flex-col gap-3 p-4 rounded-14 border transition-all text-left",
                      theme === "Dark"
                        ? "bg-surface-3 border-brand shadow-lg shadow-brand/10"
                        : "bg-surface-2 border-white/[0.07] hover:border-white/[0.14]",
                    )}
                  >
                    <div
                      className={cn(
                        "h-24 w-full rounded-10",
                        theme === "Dark"
                          ? "bg-surface-0"
                          : theme === "Light"
                            ? "bg-white"
                            : "bg-linear-to-br from-surface-0 to-white",
                      )}
                    />
                    <span
                      className={cn(
                        "text-[14px] font-bold",
                        theme === "Dark" ? "text-text-1" : "text-text-3",
                      )}
                    >
                      {theme}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[12px] font-medium text-text-2 ml-1 uppercase tracking-wider">
                Accent Color
              </label>
              <div className="flex gap-4">
                {[
                  "#556eff",
                  "#00f2ff",
                  "#55ff9e",
                  "#ffbd55",
                  "#ff5555",
                  "#ff55f2",
                ].map((color) => (
                  <button
                    key={color}
                    className={cn(
                      "size-10 rounded-full border-2 transition-all",
                      color === "#556eff"
                        ? "border-white scale-110"
                        : "border-transparent hover:scale-105",
                    )}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="space-y-8">
          <div className="space-y-1">
            <h2 className="font-display text-[24px] font-bold text-text-1">
              Security
            </h2>
            <p className="text-[14px] text-text-3">
              Protect your account with advanced security features.
            </p>
          </div>

          <div className="flowos-card space-y-6">
            <div className="flex items-center justify-between p-4 rounded-14 bg-surface-3/50 border border-white/[0.03]">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-full bg-brand/10 text-brand flex items-center justify-center">
                  <Shield className="size-5" />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-text-1">
                    Two-Factor Authentication
                  </p>
                  <p className="text-[12px] text-text-3">
                    Add an extra layer of security to your account.
                  </p>
                </div>
              </div>
              <button className="flowos-shadcn-btn-secondary h-9 px-4 text-[12px] w-auto">
                Enable
              </button>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/[0.05]">
              <h3 className="text-[15px] font-bold text-text-1">
                Change Password
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-text-2 ml-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="flowos-shadcn-input"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-text-2 ml-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="flowos-shadcn-input"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button className="flowos-shadcn-btn-secondary h-9 px-6 text-[13px] w-auto">
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
