import { AuthForm } from "@/components/AuthForm";
import { GlowPanel } from "@/components/GlowPanel";

export default function SignupPage() {
  return (
    <div className="auth-page">
      <GlowPanel className="auth-panel">
        <AuthForm mode="signup" />
      </GlowPanel>
    </div>
  );
}
