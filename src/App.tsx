import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Hero } from './components/Hero';
import { StatsSection } from './components/StatsSection';
import { ActivityFeed } from './components/ActivityFeed';
import { ServerInfo } from './components/ServerInfo';
import { fetchDiscordData, DiscordData } from './services/api';

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [discordData, setDiscordData] = useState<DiscordData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    // Initial fetch
    loadData();

    // Refresh data every 30 seconds
    const interval = setInterval(loadData, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      setError(null);
      const data = await fetchDiscordData();
      setDiscordData(data);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load Discord data');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-[#0F0F0F] text-gray-900 dark:text-white transition-colors duration-500">
      {/* Theme Toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-purple-400" />
        ) : (
          <Moon className="w-5 h-5 text-purple-600" />
        )}
      </button>

      {/* Main Content */}
      <Hero memberCount={discordData?.stats.totalMembers} />
      <StatsSection data={discordData?.stats} isLoading={isLoading} error={error} />
      <ActivityFeed activities={discordData?.activities} isLoading={isLoading} />
      <ServerInfo 
        staff={discordData?.staff} 
        channels={discordData?.channels} 
        isLoading={isLoading} 
      />
    </div>
  );
}