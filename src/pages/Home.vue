<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div class="container max-w-5xl py-4">
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary">
            <Sprout class="w-5 h-5 text-secondary-foreground" />
          </div>
          <div>
            <h1 class="font-heading text-xl font-bold text-foreground">
              Stardew Manager
            </h1>
            <p class="text-xs text-muted-foreground">
              Prepare for your daily activities and track your progress
            </p>
          </div>
        </div>
      </div>
    </header>

    <main class="container max-w-5xl py-6 space-y-8">
      <!-- Checklists Section -->
      <section>
        <h2 class="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <ClipboardList class="w-5 h-5 text-primary" />
          Checklists
        </h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ChecklistCard
            v-for="checklist in checklists"
            :key="checklist.id"
            :checklist="checklist"
          />
        </div>
      </section>

      <!-- Two Column Section -->
      <section class="grid gap-6 lg:grid-cols-2">
        <!-- Left: Daily Prep -->
        <div class="bg-card border border-border rounded-xl overflow-hidden">
          <div class="p-4 border-b border-border bg-muted/30">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
                  <ShoppingBasket class="w-5 h-5 text-primary" />
                  Daily Prep
                </h2>
                <p class="text-xs text-muted-foreground mt-1">
                  Today's recipes and ingredients to gather
                </p>
              </div>
              <div v-if="overallIngredientsRef?.hasAnyItems" class="flex items-center gap-2">
                <button
                  @click="handleClearAll"
                  class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive text-xs font-medium transition-all border border-destructive/30 hover:border-destructive/50"
                >
                  <Trash2 class="w-3.5 h-3.5" />
                  Clear
                </button>
                <button
                  @click="handleNewDay"
                  class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/20 hover:bg-accent/40 text-accent-foreground text-xs font-medium transition-all border border-accent/30 hover:border-accent/50"
                >
                  <Sunrise class="w-3.5 h-3.5" />
                  New Day
                </button>
              </div>
            </div>
          </div>
          <div class="p-4">
            <OverallIngredients ref="overallIngredientsRef" />
          </div>
        </div>

        <!-- Right: Notes/Backlog -->
        <div class="bg-card border border-border rounded-xl overflow-hidden">
          <div class="p-4 border-b border-border bg-muted/30">
            <h2 class="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
              <StickyNote class="w-5 h-5 text-accent" />
              Farm Notes
            </h2>
            <p class="text-xs text-muted-foreground mt-1">
              Jot down reminders, goals, or things to do
            </p>
          </div>
          <div class="p-0">
            <NotesPad />
          </div>
        </div>
      </section>

      <!-- Footer -->
      <Footer />
    </main>

    <!-- Clear Confirmation Modal -->
    <Teleport to="body">
      <div 
        v-if="showClearConfirm" 
        class="fixed inset-0 z-50 flex items-center justify-center"
        @click.self="showClearConfirm = false"
      >
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="showClearConfirm = false" />
        <div class="relative bg-card border border-border rounded-xl shadow-2xl max-w-xs w-full mx-4 p-5">
          <div class="text-center space-y-4">
            <div class="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
              <Trash2 class="w-6 h-6 text-destructive" />
            </div>
            <div>
              <h3 class="font-heading text-lg font-semibold text-foreground">Clear All Items?</h3>
              <p class="text-sm text-muted-foreground mt-1">
                This will remove all recipes from your Daily Prep list.
              </p>
            </div>
            <div class="flex gap-3">
              <button
                @click="showClearConfirm = false"
                class="flex-1 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground text-sm font-medium transition-all"
              >
                Cancel
              </button>
              <button
                @click="confirmClearAll"
                class="flex-1 px-4 py-2 rounded-lg bg-destructive hover:bg-destructive/90 text-destructive-foreground text-sm font-medium transition-all"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Sprout, ClipboardList, ShoppingBasket, StickyNote, Sunrise, Trash2 } from 'lucide-vue-next'
import ChecklistCard from '@/components/ChecklistCard.vue'
import OverallIngredients from '@/components/OverallIngredients.vue'
import NotesPad from '@/components/NotesPad.vue'
import Footer from '@/components/Footer.vue'

const overallIngredientsRef = ref<InstanceType<typeof OverallIngredients> | null>(null)
const showClearConfirm = ref(false)

const handleNewDay = () => {
  overallIngredientsRef.value?.startNewDay()
}

const handleClearAll = () => {
  showClearConfirm.value = true
}

const confirmClearAll = () => {
  overallIngredientsRef.value?.clearAll()
  showClearConfirm.value = false
}

interface Checklist {
  id: string
  name: string
  icon: string
  description: string
  route: string
}

const checklists: Checklist[] = [
  {
    id: 'cooking',
    name: 'Cooking',
    icon: '🍳',
    description: 'Check your ingredients and recipes to cook',
    route: '/cooking',
  },
  {
    id: 'crafting',
    name: 'Crafting',
    icon: '🔨',
    description: 'Check your materials and recipes to craft',
    route: '/crafting',
  }
]
</script>
