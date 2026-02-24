import Navbar from "@/components/ui/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="relative z-10">{children}</main>
    </>
  );
}
