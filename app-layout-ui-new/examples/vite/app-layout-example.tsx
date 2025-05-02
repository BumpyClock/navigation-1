import { useState } from 'react';
import { AppLayout } from 'app-layout-ui'; // In actual usage, this would be imported from the package

export default function AppLayoutExample() {
  const [darkMode, setDarkMode] = useState(false);
  
  // Define site info with logo and name
  const siteInfo = {
    name: "Vite App",
    logo: "https://vitejs.dev/logo.svg",
    description: "Development Dashboard"
  };
  
  // Define custom teams for the sidebar
  const teams = [
    {
      name: "Vite Project",
      logo: "https://vitejs.dev/logo.svg",
    },
    {
      name: "React",
      logo: "https://react.dev/favicon.ico",
    },
  ];

  // Define custom navigation for the sidebar
  const sidebarNavItems = {
    main: {
      title: "Navigation",
      url: "#",
      items: [
        {
          title: "Home",
          url: "/",
          icon: "home",
          isActive: true,
        },
        {
          title: "Projects",
          url: "/projects",
          icon: "computer",
        },
        {
          title: "Settings",
          url: "/settings",
          icon: "settings",
        },
      ],
    },
    secondary: {
      title: "Resources",
      url: "#",
      items: [
        {
          title: "Documentation",
          url: "https://vitejs.dev/guide/",
          icon: "stack",
        },
        {
          title: "Community",
          url: "https://vitejs.dev/guide/",
          icon: "mickey",
        },
      ],
    }
  };

  // Define custom settings panel content
  const settingsPanelContent = (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium text-sm mb-1">Theme</h3>
        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="dark-mode" 
            checked={darkMode} 
            onChange={() => setDarkMode(!darkMode)} 
            className="mr-2" 
          />
          <label htmlFor="dark-mode" className="text-sm">Dark Mode</label>
        </div>
      </div>
      <div>
        <h3 className="font-medium text-sm mb-1">Layout</h3>
        <select className="w-full bg-background border border-sidebar-border rounded-md p-2 text-sm">
          <option>Compact</option>
          <option>Comfortable</option>
          <option>Spacious</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className={darkMode ? 'dark' : ''}>
      <AppLayout
        showSettingsPanel={true}
        defaultSettingsPanelOpen={true}
        siteInfo={siteInfo}
        teams={teams}
        sidebarNavItems={sidebarNavItems}
        backgroundClassName="bg-white dark:bg-gray-950"
        settingsPanelContent={settingsPanelContent}
        onLogoClick={() => console.log("Logo clicked")}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Vite + React Example</h1>
          <p className="mb-4">This is an example of using app-layout-ui in a Vite project.</p>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="font-medium">Getting Started</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Edit this component to see changes reflected in real-time.
            </p>
            <button 
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
              onClick={() => alert('Button clicked!')}
            >
              Click me
            </button>
          </div>
        </div>
      </AppLayout>
    </div>
  );
}