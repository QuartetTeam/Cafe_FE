import Layout from "../../components/layout";

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <div className="pt-16">{children}</div> {/* 64px or 4rem = Tailwind pt-16 */}
    </Layout>
  );
}