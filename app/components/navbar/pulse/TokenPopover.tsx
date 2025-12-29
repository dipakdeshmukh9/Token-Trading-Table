"use client";

import { memo } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/app/components/ui/Popover";
import { Button } from "@/app/components/ui/Button";
import { ExternalLink } from "lucide-react";
import { formatNumber, formatPrice } from "@/app/lib/format";
import type { Token } from "@/app/lib/types";

interface TokenPopoverProps {
  token: Token;
  children: React.ReactNode;
}

/**
 * TokenPopover - displays detailed token information in a popover
 */
const TokenPopover = memo(({ token, children }: TokenPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="p-0 bg-white/6 border border-white/12 backdrop-blur-xl">
        {/* Header */}
        <div className="px-4 py-3 border-b border-white/8">
          <h3 className="font-semibold text-sm text-white">{token.name}</h3>
          <p className="text-xs text-white/50 mt-0.5">{token.symbol}</p>
        </div>

        {/* Content */}
        <div className="px-4 py-3 space-y-3">
          {/* Price Section */}
          <div className="space-y-1">
            <p className="text-xs text-white/50">Price</p>
            <p className="text-sm font-mono text-white">
              ${formatPrice(token.price || 0, 8)}
            </p>
          </div>

          {/* Market Cap */}
          <div className="space-y-1">
            <p className="text-xs text-white/50">Market Cap</p>
            <p className="text-sm font-mono text-white">
              ${formatNumber(token.mc / 1000000, 2)}M
            </p>
          </div>

          {/* Volume & TX */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <p className="text-xs text-white/50">Volume 24h</p>
              <p className="text-xs font-mono text-white/70">
                ${formatNumber(token.volume24h || 0 / 1000000, 1)}M
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-white/50">Transactions</p>
              <p className="text-xs font-mono text-white/70">
                {formatNumber(token.txCount || 0 / 1000, 1)}K
              </p>
            </div>
          </div>

          {/* Description */}
          {token.description && (
            <div className="space-y-1">
              <p className="text-xs text-white/50">About</p>
              <p className="text-xs text-white/70 leading-relaxed">
                {token.description}
              </p>
            </div>
          )}

          {/* Links */}
          {token.links && (
            <div className="pt-2 border-t border-white/8 space-y-2">
              <p className="text-xs text-white/50 font-medium">Links</p>
              <div className="flex flex-wrap gap-2">
                {token.links.website && (
                  <a
                    href={token.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="xs"
                      variant="outline"
                      className="gap-1 text-xs h-7"
                    >
                      Website <ExternalLink size={12} />
                    </Button>
                  </a>
                )}
                {token.links.twitter && (
                  <a
                    href={token.links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="xs"
                      variant="outline"
                      className="gap-1 text-xs h-7"
                    >
                      Twitter <ExternalLink size={12} />
                    </Button>
                  </a>
                )}
                {token.links.discord && (
                  <a
                    href={token.links.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="xs"
                      variant="outline"
                      className="gap-1 text-xs h-7"
                    >
                      Discord <ExternalLink size={12} />
                    </Button>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
});

TokenPopover.displayName = "TokenPopover";

export default TokenPopover;
