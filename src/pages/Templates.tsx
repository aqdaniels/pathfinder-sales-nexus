
import { Layout } from "@/components/layout/Layout";

export default function Templates() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
          <p className="text-muted-foreground">
            Standard templates for presentations, proposals, and documents
          </p>
        </div>
        <div className="bg-muted/50 rounded-lg p-12 flex flex-col items-center justify-center">
          <p className="text-muted-foreground text-center">
            Templates library will be implemented soon.
          </p>
        </div>
      </div>
    </Layout>
  );
}
