import { Grid3X3, List } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  layout: "grid" | "list";
  onChange: (layout: "grid" | "list") => void;
}

export function ViewToggle({ layout, onChange }: Props) {
  return (
    <div className="inline-flex rounded-lg border border-border bg-card p-1">
      <button
        onClick={() => onChange("grid")}
        className={cn(
          "flex items-center justify-center w-9 h-9 rounded-md transition-all",
          layout === "grid"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
        aria-label="Grid view"
      >
        <Grid3X3 className="w-4 h-4" />
      </button>
      <button
        onClick={() => onChange("list")}
        className={cn(
          "flex items-center justify-center w-9 h-9 rounded-md transition-all",
          layout === "list"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
        aria-label="List view"
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  );
}
