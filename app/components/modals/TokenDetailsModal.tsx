"use client";

import { useSelector } from "react-redux";
import { useUI } from "@/app/hooks/useTokens";
import { Dialog } from "@/app/components/ui/Dialog";
import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";
import { Card, CardContent } from "@/app/components/ui/Card";
import { Tooltip } from "@/app/components/ui/Tooltip";
import {
  TrendingUp,
  TrendingDown,
  Globe,
  Twitter,
  MessageCircle,
  Copy,
} from "lucide-react";
import { formatPrice, formatNumber, formatPercent } from "@/app/lib/format";
import type { RootState } from "@/app/store/store";

/**
 * TokenDetailsModal - Detailed view of a token
 */
export default function TokenDetailsModal() {
  const { modals, closeDetailsModal, openBuyModal } = useUI();
  const { byCategory } = useSelector((state: RootState) => state.tokens);

  // Find token
  const token = (
    Object.values(byCategory).flatMap((arr) => arr) as any[]
  ).find((t) => t.id === modals.details.tokenId);

  if (!token) {
    return null;
  }

  const priceIsPositive = (token.priceChange24h || 0) >= 0;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(token.id);
  };

  return (
    <Dialog
      isOpen={modals.details.isOpen}
      onOpenChange={closeDetailsModal}
      title={token.name}
      description={`${token.symbol} • Market Cap: $${(token.mc / 1000000).toFixed(2)}M`}
      size="lg"
    >
      <div className="space-y-6">
        {/* Header with stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="space-y-2">
              <p className="text-xs text-white/50 uppercase tracking-wider">
                Price
              </p>
              <p className="text-xl font-bold">${formatPrice(token.price, 6)}</p>
              <div className="flex items-center gap-1 mt-2">
                {priceIsPositive ? (
                  <TrendingUp className="w-3 h-3 text-green-400" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-400" />
                )}
                <span
                  className={priceIsPositive ? "text-green-400" : "text-red-400"}
                >
                  {formatPercent(token.priceChange24h || 0)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-2">
              <p className="text-xs text-white/50 uppercase tracking-wider">
                Market Cap
              </p>
              <p className="text-xl font-bold">
                ${formatNumber(token.mc / 1000000, 2)}M
              </p>
              <div className="text-xs text-white/40">
                Rank: Top {Math.floor(Math.random() * 100) + 1}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="space-y-2">
              <p className="text-xs text-white/50 uppercase tracking-wider">
                Volume (24h)
              </p>
              <p className="text-xl font-bold">
                ${formatNumber(token.volume24h / 1000, 0)}K
              </p>
              <div className="text-xs text-white/40">
                Liquidity Score: {Math.floor(Math.random() * 100)}%
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-2">
              <p className="text-xs text-white/50 uppercase tracking-wider">
                Transactions
              </p>
              <p className="text-xl font-bold">{token.txCount}</p>
              <div className="text-xs text-white/40">Last 24 hours</div>
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        {token.description && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About</h4>
            <p className="text-sm text-white/70 leading-relaxed">
              {token.description}
            </p>
          </div>
        )}

        {/* Token Address */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Token Address</h4>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-white/2 border border-white/6">
            <code className="text-xs text-white/50 flex-1 truncate">
              {token.id}
            </code>
            <Tooltip content="Copied!">
              <Button
                size="xs"
                variant="ghost"
                onClick={handleCopyAddress}
                className="flex-shrink-0"
              >
                <Copy size={14} />
              </Button>
            </Tooltip>
          </div>
        </div>

        {/* Social Links */}
        {token.links && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Community</h4>
            <div className="flex items-center gap-2">
              {token.links.website && (
                <Tooltip content="Website">
                  <a
                    href={token.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/2 hover:bg-white/6 border border-white/6 transition-colors"
                  >
                    <Globe size={16} />
                  </a>
                </Tooltip>
              )}
              {token.links.twitter && (
                <Tooltip content="Twitter">
                  <a
                    href={token.links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/2 hover:bg-white/6 border border-white/6 transition-colors"
                  >
                    <Twitter size={16} />
                  </a>
                </Tooltip>
              )}
              {token.links.discord && (
                <Tooltip content="Discord">
                  <a
                    href={token.links.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/2 hover:bg-white/6 border border-white/6 transition-colors"
                  >
                    <MessageCircle size={16} />
                  </a>
                </Tooltip>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button variant="secondary" fullWidth onClick={closeDetailsModal}>
            Close
          </Button>
          <Button
            variant="primary"
            fullWidth
            onClick={() => {
              openBuyModal(token.id);
            }}
          >
            Buy {token.symbol}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
