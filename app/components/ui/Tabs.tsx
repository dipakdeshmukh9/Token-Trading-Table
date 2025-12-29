"use client";

import React from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import clsx from "clsx";

interface Tab {
  value: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  defaultValue: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

/**
 * Tabs component using Radix UI
 */
const Tabs = ({
  tabs,
  defaultValue,
  onValueChange,
  children,
  className,
}: TabsProps) => {
  return (
    <RadixTabs.Root
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      className={className}
    >
      <RadixTabs.List className="flex items-center gap-2 border-b border-white/6 bg-white/1 p-2 rounded-t-lg">
        {tabs.map((tab) => (
          <RadixTabs.Trigger
            key={tab.value}
            value={tab.value}
            className={clsx(
              "flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200",
              "text-white/60 hover:text-white hover:bg-white/5",
              "data-[state=active]:text-white data-[state=active]:bg-white/10",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            )}
          >
            {tab.icon && <span className="text-base">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className="ml-1 text-xs text-white/50">({tab.count})</span>
            )}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>

      <div className="mt-4">{children}</div>
    </RadixTabs.Root>
  );
};

/**
 * Tab content component
 */
const TabContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ value, className, ...props }, ref) => (
  <RadixTabs.Content
    value={value}
    ref={ref}
    className={clsx(
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
      className
    )}
    {...props}
  />
));

TabContent.displayName = "TabContent";

export { Tabs, TabContent };
export type { TabsProps, Tab };
