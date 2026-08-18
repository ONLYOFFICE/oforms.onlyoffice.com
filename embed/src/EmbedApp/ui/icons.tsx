/*
 * Inline icon set for the redesigned panel.
 *
 * Every glyph paints with `currentColor` so the consuming component controls
 * the colour through an --oo-* token. Sizes match the Figma nodes exactly
 * (24x24 nav/controls, 16x16 group chevron, 8x8 clear cross, 24x30 formats).
 *
 * TODO(icons): these are hand-drawn stand-ins. Replace each with the real
 * export listed in the plan's icon manifest, keeping the same component name,
 * box size and `currentColor` fill so no consumer has to change.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const svg24 = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
} as const;

const AllTemplatesIcon = (props: IconProps) => (
  <svg {...svg24} {...props}>
    <circle cx="12" cy="12" r="8" stroke="currentColor" />
    <ellipse cx="12" cy="12" rx="3.4" ry="8" stroke="currentColor" />
    <path d="M4.4 9.4h15.2M4.4 14.6h15.2" stroke="currentColor" />
  </svg>
);

const RecentIcon = (props: IconProps) => (
  <svg {...svg24} {...props}>
    <path
      d="M12 4a8 8 0 1 1-7.6 5.5"
      stroke="currentColor"
      strokeLinecap="round"
    />
    <path d="M4 5v4.5h4.5" stroke="currentColor" strokeLinejoin="round" />
    <path d="M12 8v4.4l3 1.8" stroke="currentColor" strokeLinecap="round" />
  </svg>
);

const StarIcon = ({ filled, ...props }: IconProps & { filled?: boolean }) => (
  <svg {...svg24} {...props}>
    <path
      d="m12 5 2.16 4.38 4.84.7-3.5 3.41.83 4.82L12 16.03l-4.33 2.28.83-4.82-3.5-3.41 4.84-.7L12 5Z"
      stroke="currentColor"
      fill={filled ? "currentColor" : "none"}
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronIcon = ({
  direction = "down",
  size = 24,
  ...props
}: IconProps & { direction?: "up" | "down"; size?: 16 | 24 }) => {
  // The two Figma nodes use different boxes (24x24 filter chevron, 16x16
  // category-group chevron) but the same 8px-wide glyph, so scale the path.
  const s = size / 24;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d={direction === "up" ? "m8 14 4-4 4 4" : "m8 10 4 4 4-4"}
        stroke="currentColor"
        strokeWidth={1 / s}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const SearchIcon = (props: IconProps) => (
  <svg {...svg24} {...props}>
    <circle cx="11" cy="11" r="5.5" stroke="currentColor" />
    <path d="m15.2 15.2 3.3 3.3" stroke="currentColor" strokeLinecap="round" />
  </svg>
);

const MoreIcon = (props: IconProps) => (
  <svg {...svg24} {...props}>
    <circle cx="6.5" cy="12" r="1.25" fill="currentColor" />
    <circle cx="12" cy="12" r="1.25" fill="currentColor" />
    <circle cx="17.5" cy="12" r="1.25" fill="currentColor" />
  </svg>
);

const FiltersIcon = (props: IconProps) => (
  <svg {...svg24} {...props}>
    <path
      d="M4 7h16M7 12h10M10 17h4"
      stroke="currentColor"
      strokeLinecap="round"
    />
  </svg>
);

const CrossIcon = (props: IconProps) => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="m1 1 6 6M7 1 1 7" stroke="currentColor" strokeLinecap="round" />
  </svg>
);

export {
  AllTemplatesIcon,
  ChevronIcon,
  CrossIcon,
  FiltersIcon,
  MoreIcon,
  RecentIcon,
  SearchIcon,
  StarIcon,
};
export type { IconProps };
