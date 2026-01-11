import { Food } from "@/data/foods";
import { FoodIcon } from "./FoodIcon";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  food: Food;
  isChecked: boolean;
  onToggle: () => void;
  layout: "grid" | "list";
}

export function FoodCard({ food, isChecked, onToggle, layout }: Props) {
  if (layout === "list") {
    return (
      <div
        onClick={onToggle}
        className={cn(
          "group flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition-all duration-200",
          isChecked
            ? "bg-success/10 border-success/30"
            : "bg-card border-border hover:border-primary/30 hover:shadow-soft"
        )}
      >
        <div className={cn(
          "relative transition-transform duration-200",
          isChecked && "opacity-60"
        )}>
          <FoodIcon name={food.name} size="sm" />
          {isChecked && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "font-medium text-sm transition-colors",
            isChecked ? "text-muted-foreground line-through" : "text-foreground"
          )}>
            {food.name}
          </h3>
          <p className="text-xs text-muted-foreground truncate">
            {food.ingredients.map(i => i.name).join(", ")}
          </p>
        </div>

        <div className={cn(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
          isChecked 
            ? "bg-success border-success" 
            : "border-border group-hover:border-primary/50"
        )}>
          {isChecked && <Check className="w-4 h-4 text-white" />}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onToggle}
      className={cn(
        "group relative flex flex-col items-center p-4 rounded-xl border cursor-pointer transition-all duration-200",
        isChecked
          ? "bg-success/10 border-success/30"
          : "bg-card border-border hover:border-primary/30 hover:shadow-soft hover:-translate-y-0.5"
      )}
    >
      <div className={cn(
        "absolute top-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
        isChecked 
          ? "bg-success border-success" 
          : "border-border group-hover:border-primary/50"
      )}>
        {isChecked && <Check className="w-4 h-4 text-white" />}
      </div>

      <div className={cn(
        "transition-all duration-200",
        isChecked && "opacity-60 scale-95"
      )}>
        <FoodIcon name={food.name} size="lg" />
      </div>
      
      <h3 className={cn(
        "mt-3 font-medium text-sm text-center transition-colors",
        isChecked ? "text-muted-foreground line-through" : "text-foreground"
      )}>
        {food.name}
      </h3>
      
      <p className="text-xs text-muted-foreground text-center mt-1 line-clamp-2">
        {food.ingredients.map(i => i.name).join(", ")}
      </p>
    </div>
  );
}
