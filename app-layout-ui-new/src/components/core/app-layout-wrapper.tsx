"use client"

import React from "react";
import { AppLayout, AppLayoutProps } from "./app-layout";
import { AppLayoutStateProvider } from "../../lib/state";
import { Team } from "../../types";
import { PerformanceMonitor, useComponentPerformance } from "../../lib/performance";

/**
 * A wrapper component for AppLayout that provides state management and performance monitoring
 * 
 * This higher-order component wraps the AppLayout with our state management
 * provider and performance monitoring to enable global application state
 * and track component performance.
 * 
 * @component
 */
export function AppLayoutWithState(props: AppLayoutProps) {
  const {
    defaultSettingsPanelOpen = true,
    teams = [],
    onTeamChange,
  } = props;

  // Track component mount performance
  useComponentPerformance('AppLayoutWithState');

  // Initialize state with props
  const initialState = {
    sidebarOpen: true,
    settingsPanelOpen: defaultSettingsPanelOpen,
    theme: 'system',
    activeTeam: teams && teams.length > 0 ? teams[0] : null
  };
  
  // Custom team change handler that updates active team in state
  const handleTeamChange = (team: Team) => {
    if (onTeamChange) {
      onTeamChange(team);
    }
  };

  return (
    <AppLayoutStateProvider initialState={initialState}>
      <PerformanceMonitor 
        id="AppLayout"
        enableInProduction={process.env.NODE_ENV === 'production' && process.env.ENABLE_PERF_LOGGING === 'true'}
        logToConsole={process.env.NODE_ENV !== 'production'}
      >
        <AppLayout
          {...props}
          onTeamChange={handleTeamChange}
        />
      </PerformanceMonitor>
    </AppLayoutStateProvider>
  );
}