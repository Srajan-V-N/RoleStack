import { useResume } from "@/modules/rb/context/ResumeContext";
import Button from "@/modules/rb/components/ui/Button";
import AccordionCard from "@/modules/rb/components/ui/AccordionCard";
import PersonalInfoSection from "@/modules/rb/components/builder/sections/PersonalInfoSection";
import SummarySection from "@/modules/rb/components/builder/sections/SummarySection";
import EducationSection from "@/modules/rb/components/builder/sections/EducationSection";
import ExperienceSection from "@/modules/rb/components/builder/sections/ExperienceSection";
import ProjectsSection from "@/modules/rb/components/builder/sections/ProjectsSection";
import SkillsSection from "@/modules/rb/components/builder/sections/SkillsSection";
import LinksSection from "@/modules/rb/components/builder/sections/LinksSection";

export default function BuilderForm() {
  const { dispatch } = useResume();

  return (
    <div className="space-y-4">
      <Button variant="ghost" onClick={() => dispatch({ type: "LOAD_SAMPLE" })}>
        Load Sample Data
      </Button>

      <AccordionCard title="Personal Info" defaultOpen>
        <PersonalInfoSection />
      </AccordionCard>

      <AccordionCard title="Summary">
        <SummarySection />
      </AccordionCard>

      <AccordionCard title="Education">
        <EducationSection />
      </AccordionCard>

      <AccordionCard title="Experience">
        <ExperienceSection />
      </AccordionCard>

      <AccordionCard title="Projects">
        <ProjectsSection />
      </AccordionCard>

      <AccordionCard title="Skills">
        <SkillsSection />
      </AccordionCard>

      <AccordionCard title="Links">
        <LinksSection />
      </AccordionCard>
    </div>
  );
}
