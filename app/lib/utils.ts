/** Joins class names, skipping empty values. shadcn-vue registry components import this as `cn`. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}
