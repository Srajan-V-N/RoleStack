import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-[24px] py-[64px] text-center">
      <h1 className="text-foreground">Stop Missing The Right Jobs.</h1>
      <p className="mt-[16px] prose-width text-muted-foreground">
        Precision-matched job discovery delivered daily at 9AM.
      </p>
      <Button
        className="mt-[40px]"
        size="lg"
        onClick={() => navigate("/settings")}
      >
        Start Tracking
      </Button>
    </main>
  );
};

export default Index;
