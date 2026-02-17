import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
"@/components/ui/select";
import { Search } from "lucide-react";

export interface Filters {
  keyword: string;
  location: string;
  mode: string;
  experience: string;
  source: string;
  sort: string;
  status: string;
}

interface FilterBarProps {
  filters: Filters;
  onChange: (f: Filters) => void;
}

const locations = ["All", "Bangalore", "Mumbai", "Chennai", "Hyderabad", "Pune", "Noida", "Kolkata", "Mysore"];
const modes = ["All", "Remote", "Hybrid", "Onsite"];
const experiences = ["All", "Fresher", "0-1", "1-3", "3-5"];
const sources = ["All", "LinkedIn", "Naukri", "Indeed"];
const statuses = ["All", "Not Applied", "Applied", "Rejected", "Selected"];
const sorts = ["Latest", "Oldest", "Match Score", "Salary"];

const FilterBar = ({ filters, onChange }: FilterBarProps) => {
  const set = (key: keyof Filters, value: string) =>
  onChange({ ...filters, [key]: value });

  return (
    <div className="flex flex-wrap items-end gap-[16px]">
      {/* Keyword */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search title or company…"
          value={filters.keyword}
          onChange={(e) => set("keyword", e.target.value)}
          className="pl-10 font-sans" />

      </div>

      <FilterSelect label="Location" value={filters.location} options={locations} onValueChange={(v) => set("location", v)} />
      <FilterSelect label="Mode" value={filters.mode} options={modes} onValueChange={(v) => set("mode", v)} />
      <FilterSelect label="Experience" value={filters.experience} options={experiences} onValueChange={(v) => set("experience", v)} />
      <FilterSelect label="Source" value={filters.source} options={sources} onValueChange={(v) => set("source", v)} />
      <FilterSelect label="Status" value={filters.status} options={statuses} onValueChange={(v) => set("status", v)} />
      <FilterSelect label="Sort" value={filters.sort} options={sorts} onValueChange={(v) => set("sort", v)} />
    </div>);

};

function FilterSelect({
  label,
  value,
  options,
  onValueChange





}: {label: string;value: string;options: string[];onValueChange: (v: string) => void;}) {
  return (
    <div className="min-w-[130px]">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="font-sans text-sm h-10">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) =>
          <SelectItem key={o} value={o} className="font-sans text-sm">
              {o === "All" ? `${label}: All` : o}
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>);

}

export default FilterBar;