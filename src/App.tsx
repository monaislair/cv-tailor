import { useState } from "react";
import { Header } from "@/components/Layout/Header";
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
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-6xl px-6 py-8">
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as Tab)}
          className="w-full"
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
  );
}
