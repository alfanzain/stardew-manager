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
            <h2 class="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
              <ShoppingBasket class="w-5 h-5 text-primary" />
              Daily Prep
            </h2>
            <p class="text-xs text-muted-foreground mt-1">
              Today's recipes and ingredients to gather
            </p>
          </div>
          <div class="p-4">
            <OverallIngredients />
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
  </div>
</template>

<script setup lang="ts">
import { Sprout, ClipboardList, ShoppingBasket, StickyNote } from 'lucide-vue-next'
import ChecklistCard from '@/components/ChecklistCard.vue'
import OverallIngredients from '@/components/OverallIngredients.vue'
import NotesPad from '@/components/NotesPad.vue'
import Footer from '@/components/Footer.vue'

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
