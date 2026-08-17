"use client";

import { Check, Monitor, Moon, Palette, Sun } from "lucide-react";
import { useTheme } from "../theme/provider";
import type { ThemeMode } from "../themes";
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from "./menu";
import { cn } from "../lib/cn";

const MODES: { value: ThemeMode; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

/**
 * Palette and mode in one menu.
 *
 * The `mounted` guard is doing real work: the server has no way to know which
 * theme is in localStorage, so rendering the checkmarks before hydration would
 * either mismatch or flicker onto the right row. The trigger icon is stable, so
 * only the checkmarks wait.
 */
export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme, mode, setMode, themes, mounted } = useTheme();

  return (
    <Menu>
      <MenuTrigger
        aria-label="Theme"
        className={cn(
          "inline-flex size-10 cursor-pointer items-center justify-center rounded-md " +
            "text-ink-muted transition-colors hover:bg-surface-sunken hover:text-ink",
          className,
        )}
      >
        <Palette className="size-4" />
      </MenuTrigger>

      <MenuContent>
        <p className="px-3 py-1.5 text-xs font-semibold tracking-wide text-ink-subtle uppercase">
          Theme
        </p>
        {themes.map((t) => (
          <MenuItem key={t.id} onClick={() => setTheme(t.id)}>
            <span className="flex-1">{t.label}</span>
            {mounted && theme === t.id ? <Check className="size-4" /> : null}
          </MenuItem>
        ))}

        <MenuSeparator />

        <p className="px-3 py-1.5 text-xs font-semibold tracking-wide text-ink-subtle uppercase">
          Appearance
        </p>
        {MODES.map(({ value, label, icon: Icon }) => (
          <MenuItem key={value} onClick={() => setMode(value)}>
            <Icon className="size-4" />
            <span className="flex-1">{label}</span>
            {mounted && mode === value ? <Check className="size-4" /> : null}
          </MenuItem>
        ))}
      </MenuContent>
    </Menu>
  );
}
