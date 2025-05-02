"use client"

import * as React from 'react';
import dynamic from 'next/dynamic';

/**
 * Icons that are available in the component.
 * Using dynamic imports for better performance and bundle size optimization.
 * 
 * Configured with SSR: false to prevent hydration mismatches.
 * This means icons will only render on the client.
 */
const iconComponents = {
  // Navigation icons
  home: dynamic(() => import('@remixicon/react').then(mod => mod.RiHome4Line), { ssr: false }),
  dashboard: dynamic(() => import('@remixicon/react').then(mod => mod.RiDashboardLine), { ssr: false }),
  chat: dynamic(() => import('@remixicon/react').then(mod => mod.RiChatLine), { ssr: false }),
  users: dynamic(() => import('@remixicon/react').then(mod => mod.RiUserLine), { ssr: false }),
  settings: dynamic(() => import('@remixicon/react').then(mod => mod.RiSettings3Line), { ssr: false }),
  help: dynamic(() => import('@remixicon/react').then(mod => mod.RiQuestionLine), { ssr: false }),
  
  // Arrow icons
  arrowDown: dynamic(() => import('@remixicon/react').then(mod => mod.RiArrowDownSLine), { ssr: false }),
  arrowRight: dynamic(() => import('@remixicon/react').then(mod => mod.RiArrowRightSLine), { ssr: false }),
  arrowLeft: dynamic(() => import('@remixicon/react').then(mod => mod.RiArrowLeftSLine), { ssr: false }),
  arrowUp: dynamic(() => import('@remixicon/react').then(mod => mod.RiArrowUpSLine), { ssr: false }),
  
  // Other common icons
  bell: dynamic(() => import('@remixicon/react').then(mod => mod.RiBellLine), { ssr: false }),
  file: dynamic(() => import('@remixicon/react').then(mod => mod.RiFileLine), { ssr: false }),
  folder: dynamic(() => import('@remixicon/react').then(mod => mod.RiFolderLine), { ssr: false }),
  search: dynamic(() => import('@remixicon/react').then(mod => mod.RiSearchLine), { ssr: false }),
  menu: dynamic(() => import('@remixicon/react').then(mod => mod.RiMenuLine), { ssr: false }),
  close: dynamic(() => import('@remixicon/react').then(mod => mod.RiCloseLine), { ssr: false }),
  logout: dynamic(() => import('@remixicon/react').then(mod => mod.RiLogoutBoxLine), { ssr: false }),
  info: dynamic(() => import('@remixicon/react').then(mod => mod.RiInformationLine), { ssr: false }),
};

export type IconName = keyof typeof iconComponents;

/**
 * Icon component properties
 */
export interface IconProps extends React.SVGAttributes<SVGElement> {
  /** Name of the icon to display */
  name: IconName;
  
  /** Size of the icon in pixels (default: 24) */
  size?: number | string;
  
  /** CSS class name to apply to the icon */
  className?: string;
}

/**
 * Icon component
 * 
 * A wrapper component that lazy loads icons from Remix Icon library
 * to optimize performance and reduce initial bundle size.
 * 
 * @component
 * @example
 * ```tsx
 * <Icon name="home" size={24} className="text-blue-500" />
 * ```
 */
export const Icon = React.memo(function Icon({ 
  name, 
  size = 24, 
  className,
  ...props 
}: IconProps) {
  // Track if component is mounted for SSR
  const [isMounted, setIsMounted] = React.useState(false);
  
  // Set mounted state after first render
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Memoize the icon component to prevent unnecessary re-renders
  const IconComponent = React.useMemo(() => {
    return iconComponents[name];
  }, [name]);
  
  // Don't render anything during SSR to prevent hydration mismatches
  if (!isMounted) {
    return <span className={className} style={{ display: 'inline-block', width: size, height: size }} />;
  }
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  
  return <IconComponent size={size} className={className} {...props} />;
});