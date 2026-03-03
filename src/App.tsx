import { useState } from "react";
import { AppProvider } from "@/hooks/useAppState";
import { Header } from "@/components/Layout/Header";
import { ErrorBanner } from "@/components/Layout/ErrorBanner";
import { ProfileTab } from "@/components/Profile/ProfileTab";
import { JobAnalyzerTab } from "@/components/JobAnalyzer/JobAnalyzerTab";
import { CVGeneratorTab } from "@/components/CVGenerator/CVGeneratorTab";
import { InterviewPrepTab } from "@/components/InterviewPrep/InterviewPrepTab";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type Tab = "profile" | "analyze" | "generate" | "prep";

const TABS: { id: Tab; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "analyze", label: "Analyze Job" },
  { id: "generate", label: "Generate CV" },
  { id: "prep", label: "Interview Prep" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <ErrorBanner />
        <main className="flex-1 mx-auto w-full max-w-6xl px-6 py-8">
          <Tabs
            value={activeTab}
            // Safe: TabsList only renders valid Tab IDs defined in TABS above
            onValueChange={(v) => setActiveTab(v as Tab)}
            className="w-full"
            aria-label="Application navigation"
          >
            <TabsList className="w-full sm:w-auto mb-6">
              {TABS.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="flex-1 sm:flex-none">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="profile">
              <ProfileTab />
            </TabsContent>
            <TabsContent value="analyze">
              <JobAnalyzerTab />
            </TabsContent>
            <TabsContent value="generate">
              <CVGeneratorTab />
            </TabsContent>
            <TabsContent value="prep">
              <InterviewPrepTab />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </AppProvider>
  );
}
