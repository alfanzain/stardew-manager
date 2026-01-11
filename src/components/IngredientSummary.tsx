import { foods, Ingredient } from "@/data/foods";
import { ChevronDown, ChevronRight, Leaf, Milk, Fish, Pickaxe, Store, FlaskConical } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  uncheckedFoods: string[];
}

interface AggregatedIngredient {
  name: string;
  quantity: number;
  source: string;
  subIngredients?: AggregatedIngredient[];
}

const getSourceIcon = (source: string) => {
  const s = source.toLowerCase();
  if (s.includes("farm") || s.includes("forag")) return <Leaf className="w-4 h-4" />;
  if (s.includes("cow") || s.includes("chicken") || s.includes("milk") || s.includes("egg")) return <Milk className="w-4 h-4" />;
  if (s.includes("fish") || s.includes("crab") || s.includes("ocean")) return <Fish className="w-4 h-4" />;
  if (s.includes("mine") || s.includes("cave")) return <Pickaxe className="w-4 h-4" />;
  if (s.includes("shop") || s.includes("oasis")) return <Store className="w-4 h-4" />;
  if (s.includes("cook") || s.includes("press") || s.includes("maker") || s.includes("mill") || s.includes("keg")) return <FlaskConical className="w-4 h-4" />;
  return <Leaf className="w-4 h-4" />;
};

export function IngredientSummary({ uncheckedFoods }: Props) {
  const [expanded, setExpanded] = useState(true);
  const [expandedIngredients, setExpandedIngredients] = useState<Set<string>>(new Set());

  const toggleIngredient = (name: string) => {
    setExpandedIngredients(prev => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  // Aggregate all ingredients from unchecked foods
  const aggregated = new Map<string, AggregatedIngredient>();

  const processIngredient = (ing: Ingredient) => {
    const existing = aggregated.get(ing.name);
    if (existing) {
      existing.quantity += ing.quantity;
    } else {
      aggregated.set(ing.name, {
        name: ing.name,
        quantity: ing.quantity,
        source: ing.source || "",
        subIngredients: ing.subIngredients?.map(sub => ({
          name: sub.name,
          quantity: sub.quantity,
          source: sub.source || ""
        }))
      });
    }

    // Also aggregate sub-ingredients
    if (ing.subIngredients) {
      ing.subIngredients.forEach(sub => {
        const existingSub = aggregated.get(sub.name);
        if (existingSub) {
          existingSub.quantity += sub.quantity * ing.quantity;
        } else {
          aggregated.set(sub.name, {
            name: sub.name,
            quantity: sub.quantity * ing.quantity,
            source: sub.source || ""
          });
        }
      });
    }
  };

  uncheckedFoods.forEach(foodId => {
    const food = foods.find(f => f.id === foodId);
    if (food) {
      food.ingredients.forEach(processIngredient);
    }
  });

  const sortedIngredients = Array.from(aggregated.values()).sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  if (uncheckedFoods.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
          🎉 All Done!
        </h2>
        <p className="text-muted-foreground text-sm">
          You've completed all the food recipes! Amazing work, farmer!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">📦</span>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Ingredients to Prepare
          </h2>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            {sortedIngredients.length} items
          </span>
        </div>
        {expanded ? (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        )}
      </button>

      {expanded && (
        <div className="border-t border-border p-4">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {sortedIngredients.map(ing => {
              const hasSubIngredients = ing.subIngredients && ing.subIngredients.length > 0;
              const isExpanded = expandedIngredients.has(ing.name);

              return (
                <div key={ing.name} className="bg-muted/30 rounded-lg overflow-hidden">
                  <div 
                    className={cn(
                      "flex items-center gap-3 p-3",
                      hasSubIngredients && "cursor-pointer hover:bg-muted/50"
                    )}
                    onClick={() => hasSubIngredients && toggleIngredient(ing.name)}
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-background text-primary">
                      {getSourceIcon(ing.source)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground text-sm truncate">
                          {ing.name}
                        </span>
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                          ×{ing.quantity}
                        </span>
                        {hasSubIngredients && (
                          isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-muted-foreground ml-auto" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                          )
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {ing.source}
                      </p>
                    </div>
                  </div>

                  {hasSubIngredients && isExpanded && (
                    <div className="border-t border-border/50 bg-background/50 px-3 py-2">
                      <p className="text-xs text-muted-foreground mb-1">Requires:</p>
                      {ing.subIngredients!.map(sub => (
                        <div key={sub.name} className="flex items-center gap-2 text-xs py-1">
                          <span className="text-foreground">{sub.name}</span>
                          <span className="text-primary">×{sub.quantity}</span>
                          <span className="text-muted-foreground">({sub.source})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
