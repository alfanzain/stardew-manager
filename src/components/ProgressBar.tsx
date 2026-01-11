import { cn } from "@/lib/utils";

interface Props {
  completed: number;
  total: number;
  percentage: number;
}

export function ProgressBar({ completed, total, percentage }: Props) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">🏆</span>
          <span className="font-heading font-semibold text-foreground">
            Gourmet Chef Progress
          </span>
        </div>
        <span className="text-sm font-medium text-primary">
          {completed}/{total}
        </span>
      </div>
      
      <div className="relative h-3 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out",
            percentage === 100 
              ? "bg-gradient-to-r from-success to-success-light" 
              : "bg-gradient-to-r from-primary to-primary-light"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <p className="text-xs text-muted-foreground mt-2">
        {percentage === 100 
          ? "🎉 Achievement Unlocked! You're a master chef!" 
          : `${total - completed} recipes remaining`}
      </p>
    </div>
  );
}
