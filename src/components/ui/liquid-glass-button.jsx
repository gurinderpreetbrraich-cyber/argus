import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const liquidButtonVariants = cva(
  "relative inline-flex items-center transition-colors justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full text-sm font-medium disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
  {
    variants: {
      size: {
        default: "h-9 px-4 py-2",
        lg: "h-11 rounded-full px-8",
        xl: "h-12 rounded-full px-10",
        xxl: "h-14 rounded-full px-14",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export function LiquidButton({
  className,
  size,
  asChild = false,
  children,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn("text-white", liquidButtonVariants({ size, className }))}
      {...props}
    >
      <div
        className="absolute top-0 left-0 z-0 h-full w-full rounded-full shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.4)] transition-all"
      />
      <div
        className="absolute top-0 left-0 isolate -z-10 h-full w-full overflow-hidden rounded-full"
        style={{ backdropFilter: 'url("#argus-glass-filter")' }}
      />
      <div className="pointer-events-none z-10">{children}</div>
      <GlassFilter />
    </Comp>
  );
}

function GlassFilter() {
  return (
    <svg className="hidden">
      <defs>
        <filter
          id="argus-glass-filter"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="60"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}
