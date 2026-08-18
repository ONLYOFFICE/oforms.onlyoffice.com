/*
 * Inline icon set for the redesigned panel.
 *
 * Every glyph paints with `currentColor` so the consuming component controls
 * the colour through an --oo-* token. Sizes match the Figma nodes exactly
 * (24x24 nav/controls, 16x16 group chevron, 8x8 clear cross, 24x30 formats).
 *
 * TODO(icons): most of these are hand-drawn stand-ins. Replace each with the
 * real export listed in the plan's icon manifest, keeping the same component
 * name, box size and `currentColor` fill so no consumer has to change.
 *
 * CloudIcon and LocalIcon are the exception -- their paths are the designer's
 * actual exports (src/icons/source-cloud.svg, src/icons/source-local.svg),
 * recoloured to currentColor so the token layer drives them.
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

const FiltersIcon = (props: IconProps) => (
  <svg {...svg24} {...props}>
    <path
      d="M4 7h16M7 12h10M10 17h4"
      stroke="currentColor"
      strokeLinecap="round"
    />
  </svg>
);

const CloudIcon = (props: IconProps) => (
  <svg
    width="16"
    height="12"
    viewBox="0 0 16 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.5 6.5H12C12 6.77614 12.2239 7 12.5 7V6.5ZM3.52344 4.53223L3.59089 5.02766C3.81947 4.99654 3.9971 4.81306 4.02079 4.58359L3.52344 4.53223ZM8 0.5V1C10.2091 1 12 2.79086 12 5H12.5H13C13 2.23858 10.7614 0 8 0V0.5ZM12.5 5H12V6.5H12.5H13V5H12.5ZM12.5 6.5V7H13V6.5V6H12.5V6.5ZM13 6.5V7C14.1046 7 15 7.89543 15 9H15.5H16C16 7.34315 14.6569 6 13 6V6.5ZM15.5 9H15C15 10.1046 14.1046 11 13 11V11.5V12C14.6569 12 16 10.6569 16 9H15.5ZM13 11.5V11H4V11.5V12H13V11.5ZM4 11.5V11C2.34315 11 1 9.65685 1 8H0.5H0C0 10.2091 1.79086 12 4 12V11.5ZM0.5 8H1C1 6.48212 2.12774 5.22685 3.59089 5.02766L3.52344 4.53223L3.45599 4.0368C1.50402 4.30254 0 5.97518 0 8H0.5ZM3.52344 4.53223L4.02079 4.58359C4.22869 2.57044 5.93147 1 8 1V0.5V0C5.41384 0 3.2861 1.96302 3.02608 4.48087L3.52344 4.53223Z"
      fill="currentColor"
    />
  </svg>
);

const LocalIcon = (props: IconProps) => (
  <svg
    width="14"
    height="13"
    viewBox="0 0 14 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.5 12C9.77614 12 10 12.2239 10 12.5C10 12.7761 9.77614 13 9.5 13H4.5C4.22386 13 4 12.7761 4 12.5C4 12.2239 4.22386 12 4.5 12H9.5ZM12.5 0C13.3284 0 14 0.671573 14 1.5V9.5C14 10.3284 13.3284 11 12.5 11H1.5C0.671573 11 0 10.3284 0 9.5V1.5C1.28852e-07 0.671573 0.671573 0 1.5 0H12.5ZM1.5 1C1.22386 1 1 1.22386 1 1.5V9.5C1 9.77614 1.22386 10 1.5 10H12.5C12.7761 10 13 9.77614 13 9.5V1.5C13 1.22386 12.7761 1 12.5 1H1.5Z"
      fill="currentColor"
    />
  </svg>
);

const CrossIcon = ({ size = 8, ...props }: IconProps & { size?: 8 | 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m1 1 6 6M7 1 1 7"
      stroke="currentColor"
      strokeWidth={8 / size}
      strokeLinecap="round"
    />
  </svg>
);

export {
  AllTemplatesIcon,
  ChevronIcon,
  CloudIcon,
  CrossIcon,
  LocalIcon,
  FiltersIcon,
  RecentIcon,
  SearchIcon,
  StarIcon,
};
export type { IconProps };
