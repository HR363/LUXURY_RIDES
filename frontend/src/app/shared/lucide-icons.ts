// Lucide Angular icon setup for global use
// For lucide-angular v0.525.0+, just use icon names as strings in <lucide-angular> or <app-lucide-icon>
// This file is for type safety and documentation only

export const LUCIDE_ICON_NAMES = [
  'Home',
  'Car',
  'User',
  'Star',
  'Search',
  'LogIn',
  'LogOut',
  'Plus',
  'Edit',
  'Trash2',
] as const;

export type LucideIconName = typeof LUCIDE_ICON_NAMES[number];
