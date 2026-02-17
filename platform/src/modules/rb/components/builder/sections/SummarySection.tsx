import { useResume } from "@/modules/rb/context/ResumeContext";
import FormTextarea from "@/modules/rb/components/ui/FormTextarea";

export default function SummarySection() {
  const { resume, dispatch } = useResume();

  return (
    <FormTextarea
      label="Professional Summary"
      value={resume.summary}
      onChange={(v) => dispatch({ type: "SET_SUMMARY", payload: v })}
      placeholder="A brief overview of your experience, skills, and career goals..."
    />
  );
}
