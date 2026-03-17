// app/(auth)/reset-password/page.tsx

import ResetPasswordForm from "@/src/components/auth/ResetPasswordForm";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  // ✅ unwrap the promise
  const params = await searchParams;

  const token = params?.token ?? "";

  console.log("TOKEN:", token);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
