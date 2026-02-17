import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { usePreferences, Preferences } from "@/hooks/usePreferences";
import { toast } from "sonner";
import { X } from "lucide-react";

const allLocations = ["Bangalore", "Mumbai", "Chennai", "Hyderabad", "Pune", "Noida", "Kolkata", "Mysore"];
const allModes = ["Remote", "Hybrid", "Onsite"] as const;
const allExperience = ["Fresher", "0-1", "1-3", "3-5"] as const;

const Settings = () => {
  const { preferences, save, clear, defaultPreferences } = usePreferences();
  const [form, setForm] = useState<Preferences>(preferences);
  const navigate = useNavigate();

  const handleReset = () => {
    clear();
    setForm(defaultPreferences);
    toast.success("Preferences cleared.");
  };

  const toggleLocation = (loc: string) => {
    setForm((f) => ({
      ...f,
      preferredLocations: f.preferredLocations.includes(loc)
        ? f.preferredLocations.filter((l) => l !== loc)
        : [...f.preferredLocations, loc],
    }));
  };

  const toggleMode = (mode: string) => {
    setForm((f) => ({
      ...f,
      preferredMode: f.preferredMode.includes(mode)
        ? f.preferredMode.filter((m) => m !== mode)
        : [...f.preferredMode, mode],
    }));
  };

  const handleSave = () => {
    save(form);
    toast.success("Preferences saved successfully.");
    navigate("/dashboard");
  };

  return (
    <main className="flex flex-1 flex-col px-[24px] py-[40px]">
      <h1 className="text-foreground">Preferences</h1>
      <p className="mt-[8px] prose-width text-muted-foreground">
        Configure your job tracking criteria to activate intelligent matching.
      </p>

      <div className="mt-[40px] grid gap-[24px] max-w-[720px]">
        {/* Role Keywords */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Role Keywords</CardTitle>
            <CardDescription>Enter job titles or keywords, comma-separated.</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="e.g. Frontend, React Developer, SDE Intern"
              value={form.roleKeywords}
              onChange={(e) => setForm({ ...form, roleKeywords: e.target.value })}
            />
          </CardContent>
        </Card>

        {/* Preferred Locations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Preferred Locations</CardTitle>
            <CardDescription>Select cities you'd consider.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-[12px]">
            <Select onValueChange={toggleLocation}>
              <SelectTrigger className="font-sans text-sm">
                <SelectValue placeholder="Add a location…" />
              </SelectTrigger>
              <SelectContent>
                {allLocations.map((loc) => (
                  <SelectItem key={loc} value={loc} className="font-sans text-sm">
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.preferredLocations.length > 0 && (
              <div className="flex flex-wrap gap-[8px]">
                {form.preferredLocations.map((loc) => (
                  <Badge
                    key={loc}
                    variant="secondary"
                    className="gap-1 cursor-pointer"
                    onClick={() => toggleLocation(loc)}
                  >
                    {loc}
                    <X className="h-3 w-3" />
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Work Mode */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Work Mode</CardTitle>
            <CardDescription>Select all arrangements you'd accept.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-[24px]">
              {allModes.map((mode) => (
                <div key={mode} className="flex items-center gap-[8px]">
                  <Checkbox
                    id={`mode-${mode}`}
                    checked={form.preferredMode.includes(mode)}
                    onCheckedChange={() => toggleMode(mode)}
                  />
                  <Label htmlFor={`mode-${mode}`} className="cursor-pointer">
                    {mode}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Experience Level */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Experience Level</CardTitle>
            <CardDescription>Your current career stage.</CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              value={form.experienceLevel || "none"}
              onValueChange={(v) => setForm({ ...form, experienceLevel: v === "none" ? "" : v })}
            >
              <SelectTrigger className="font-sans text-sm max-w-[240px]">
                <SelectValue placeholder="Select level…" />
              </SelectTrigger>
              <SelectContent>
              <SelectItem value="none" className="font-sans text-sm text-muted-foreground">
                None
              </SelectItem>
              {allExperience.map((exp) => (
                  <SelectItem key={exp} value={exp} className="font-sans text-sm">
                    {exp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Skills</CardTitle>
            <CardDescription>Enter your skills, comma-separated.</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="e.g. React, TypeScript, Python, Java"
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
            />
          </CardContent>
        </Card>

        {/* Min Match Score */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Minimum Match Score</CardTitle>
            <CardDescription>
              Only show jobs scoring at or above this threshold when the filter is enabled.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-[12px]">
            <div className="flex items-center justify-between font-sans text-sm">
              <span className="text-muted-foreground">Threshold</span>
              <span className="font-medium text-foreground">{form.minMatchScore}%</span>
            </div>
            <Slider
              value={[form.minMatchScore]}
              onValueChange={([v]) => setForm({ ...form, minMatchScore: v })}
              min={0}
              max={100}
              step={5}
            />
          </CardContent>
        </Card>

        <div className="flex gap-[12px]">
          <Button className="w-fit" onClick={handleSave}>
            Save Preferences
          </Button>
          <Button variant="outline" className="w-fit" onClick={handleReset}>
            Reset All
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Settings;
