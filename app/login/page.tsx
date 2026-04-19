import { AuthForm } from "@/components/AuthForm";
import { GlowPanel } from "@/components/GlowPanel";

export default function LoginPage() {
  return (
    <div className="auth-page">
      <GlowPanel className="auth-panel">
        <AuthForm mode="login" />
      </GlowPanel>
    </div>
  );
}
