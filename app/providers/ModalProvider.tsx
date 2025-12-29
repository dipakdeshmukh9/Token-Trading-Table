"use client";

import BuyModal from "@/app/components/modals/BuyModal";
import TokenDetailsModal from "@/app/components/modals/TokenDetailsModal";

/**
 * ModalProvider - Centralized management of all modals
 * Should be placed at the layout level to have global access
 */
export default function ModalProvider() {
  return (
    <>
      <BuyModal tokenId="" />
      <TokenDetailsModal />
    </>
  );
}
