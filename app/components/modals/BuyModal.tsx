"use client";

import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useUI } from "@/app/hooks/useTokens";
import { Dialog } from "@/app/components/ui/Dialog";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Badge } from "@/app/components/ui/Badge";
import { formatPrice, formatNumber } from "@/app/lib/format";
import type { RootState } from "@/app/store/store";

interface BuyModalProps {
  tokenId?: string;
  onClose?: () => void;
}

/**
 * BuyModal - Modal for buying tokens
 */
export default function BuyModal({ tokenId, onClose }: BuyModalProps) {
  const { closeBuyModal, notify } = useUI();
  const { byCategory } = useSelector((state: RootState) => state.tokens);

  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find token in all categories
  const token = (
    Object.values(byCategory).flatMap((arr) => arr) as any[]
  ).find((t) => t.id === tokenId);

  const handleClose = () => {
    closeBuyModal();
    onClose?.();
  };

  const handleBuy = useCallback(async () => {
    if (!amount || isNaN(parseFloat(amount))) {
      notify("error", "Please enter a valid amount");
      return;
    }

    setIsSubmitting(true);

    // Simulate transaction
    setTimeout(() => {
      setIsSubmitting(false);
      notify("success", `Successfully purchased ${amount} ${token?.symbol}`);
      setAmount("");
      handleClose();
    }, 1000);
  }, [amount, token, notify]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBuy();
    }
  };

  if (!token) {
    return null;
  }

  return (
    <Dialog
      isOpen={true}
      onOpenChange={handleClose}
      title={`Buy ${token.name}`}
      description={`${token.symbol} • Market Cap: $${formatNumber(token.mc / 1000000, 2)}M`}
      size="md"
    >
      <div className="space-y-4">
        {/* Token Info */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-white/2 border border-white/6">
          <div>
            <p className="text-sm font-medium">{token.name}</p>
            <p className="text-xs text-white/50 mt-0.5">Price: ${formatPrice(token.price, 6)}</p>
          </div>
          <Badge variant="success">{token.symbol}</Badge>
        </div>

        {/* Input */}
        <Input
          type="number"
          placeholder="Enter amount (SOL)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isSubmitting}
          helperText={amount ? `≈ ${(parseFloat(amount) * (token.price || 0)).toFixed(6)} ${token.symbol}` : ""}
        />

        {/* Price Summary */}
        <div className="p-3 rounded-lg bg-white/2 border border-white/6 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-white/60">Price per token</span>
            <span>${formatPrice(token.price, 6)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">Amount</span>
            <span>{amount || "0"} SOL</span>
          </div>
          <div className="border-t border-white/10 pt-2 flex justify-between font-medium">
            <span>Total</span>
            <span>
              {amount ? `${(parseFloat(amount) / (token.price || 0.001)).toFixed(2)} ${token.symbol}` : "0"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="secondary"
            fullWidth
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            fullWidth
            onClick={handleBuy}
            disabled={isSubmitting || !amount}
          >
            {isSubmitting ? "Processing..." : "Buy Now"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
