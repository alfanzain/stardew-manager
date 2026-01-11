import { useState, useMemo } from "react";
import { foods } from "@/data/foods";
import { useChecklist } from "@/hooks/useChecklist";
import { IngredientSummary } from "@/components/IngredientSummary";
import { FoodCard } from "@/components/FoodCard";
import { ProgressBar } from "@/components/ProgressBar";
import { SearchBar } from "@/components/SearchBar";
import { ViewToggle } from "@/components/ViewToggle";
import { Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const [search, setSearch] = useState("");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const { toggle, isChecked, progress } = useChecklist("stardew-foods");

  const filteredFoods = useMemo(() => {
    if (!search.trim()) return foods;
    const searchLower = search.toLowerCase();
    return foods.filter(food => 
      food.name.toLowerCase().includes(searchLower) ||
      food.ingredients.some(i => i.name.toLowerCase().includes(searchLower))
    );
  }, [search]);

  const checkedFoodIds = useMemo(() => 
    foods.filter(f => isChecked(f.id)).map(f => f.id),
    [isChecked]
  );

  const progressData = progress(foods.length);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-5xl py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary">
              <Sprout className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <h1 className="font-heading text-xl font-bold text-foreground">
                Stardew Checklist
              </h1>
              <p className="text-xs text-muted-foreground">
                Track your Gourmet Chef achievement
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-5xl py-6 space-y-6">
        {/* Progress */}
        <ProgressBar {...progressData} />

        {/* Ingredient Summary */}
        <IngredientSummary selectedFoods={checkedFoodIds} />

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full sm:max-w-md">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {filteredFoods.length} recipes
            </span>
            <ViewToggle layout={layout} onChange={setLayout} />
          </div>
        </div>

        {/* Food List */}
        <div className={cn(
          layout === "grid" 
            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
            : "flex flex-col gap-2"
        )}>
          {filteredFoods.map(food => (
            <FoodCard
              key={food.id}
              food={food}
              isChecked={isChecked(food.id)}
              onToggle={() => toggle(food.id)}
              layout={layout}
            />
          ))}
        </div>

        {filteredFoods.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No recipes found matching "{search}"
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center py-8 text-sm text-muted-foreground">
          <p>Made with 💚 for Stardew Valley farmers</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
