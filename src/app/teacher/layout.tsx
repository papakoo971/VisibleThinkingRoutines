import { TeacherAuthGate } from "@/components/teacher-auth-gate";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return <TeacherAuthGate>{children}</TeacherAuthGate>;
}
