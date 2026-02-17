import { useResume } from "@/modules/rb/context/ResumeContext";
import { useTemplate, ACCENT_COLORS } from "@/modules/rb/context/TemplateContext";
import ResumeLayout from "@/modules/rb/components/resume/ResumeLayout";
import AtsScorePanel from "@/modules/rb/components/builder/AtsScorePanel";
import TemplateTabs from "@/modules/rb/components/ui/TemplateTabs";

export default function ResumePreviewPanel() {
  const { resume } = useResume();
  const { template, accentColor } = useTemplate();
  return (
    <>
      <AtsScorePanel />
      <TemplateTabs />
      <ResumeLayout resume={resume} compact template={template} accentColor={ACCENT_COLORS[accentColor]} />
    </>
  );
}
