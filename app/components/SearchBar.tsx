"use client";

import { Search } from "lucide-react";
import { Input } from "@/app/components/ui/Input";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
}

/**
 * SearchBar component - reusable search input with icon
 */
export default function SearchBar({
  placeholder = "Search tokens...",
  value,
  onChange,
  onClear,
}: SearchBarProps) {
  return (
    <div className="relative flex-1 max-w-xs">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        icon={<Search size={16} />}
        className="pl-9"
      />
      {value && onClear && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
        >
          ×
        </button>
      )}
    </div>
  );
}
