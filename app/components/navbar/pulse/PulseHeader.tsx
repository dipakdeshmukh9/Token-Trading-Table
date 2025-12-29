"use client";

import { useTokens, useUI } from "@/app/hooks/useTokens";
import SearchBar from "@/app/components/SearchBar";
import { Button } from "@/app/components/ui/Button";
import { Tooltip } from "@/app/components/ui/Tooltip";
import {
  RefreshCw,
  HelpCircle,
  Settings,
} from "lucide-react";

/**
 * PulseHeader - Main header for the pulse page with search and controls
 */
export default function PulseHeader() {
  const { searchQuery, setSearchQuery, fetchAll } = useTokens();
  const { showChart, toggleChart } = useUI();

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleRefresh = () => {
    fetchAll();
  };

  return (
    <div className="space-y-4">
      {/* Title and Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Pulse</h1>
          <p className="text-sm text-white/50">
            Discover and track tokens in real-time
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Tooltip content="Refresh data">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleRefresh}
              className="px-3"
            >
              <RefreshCw size={16} />
            </Button>
          </Tooltip>

          <Tooltip content="Settings">
            <Button
              size="sm"
              variant="ghost"
              className="px-3"
            >
              <Settings size={16} />
            </Button>
          </Tooltip>

          <Tooltip content="Help">
            <Button
              size="sm"
              variant="ghost"
              className="px-3"
            >
              <HelpCircle size={16} />
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <SearchBar
          placeholder="Search tokens by name or symbol..."
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={handleClearSearch}
        />
        <div className="text-xs text-white/40">
          Search across all categories
        </div>
      </div>
    </div>
  );
}

