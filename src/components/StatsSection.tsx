import { motion } from 'motion/react';
import { Users, Activity, MessageSquare, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StatsData {
  totalMembers: number;
  onlineMembers: number;
  messagesToday: number;
}

interface StatsSectionProps {
  data?: StatsData;
  isLoading: boolean;
  error?: string | null;
}

const statsConfig = [
  {
    key: 'totalMembers' as const,
    icon: Users,
    label: 'Total Members',
    color: 'from-purple-500 to-purple-700'
  },
  {
    key: 'onlineMembers' as const,
    icon: Activity,
    label: 'Currently Online',
    color: 'from-green-500 to-green-700',
    pulse: true
  },
  {
    key: 'messagesToday' as const,
    icon: MessageSquare,
    label: 'Messages Today',
    color: 'from-blue-500 to-blue-700'
  }
];

export function StatsSection({ data, isLoading, error }: StatsSectionProps) {
  if (error) {
    return (
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 text-red-500 dark:text-red-400">
            <AlertCircle className="w-6 h-6" />
            <span>{error}</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {statsConfig.map((stat, index) => (
            <StatCard 
              key={stat.label} 
              stat={stat} 
              value={data?.[stat.key] ?? 0}
              isLoading={isLoading}
              index={index} 
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface StatCardProps {
  stat: typeof statsConfig[0];
  value: number;
  isLoading: boolean;
  index: number;
}

function StatCard({ stat, value, isLoading, index }: StatCardProps) {
  const [count, setCount] = useState(0);
  const Icon = stat.icon;

  useEffect(() => {
    if (isLoading || value === 0) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, isLoading]);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <div className="relative p-8 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-lg border border-gray-200/50 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300">
        {/* Gradient Overlay on Hover */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} relative`}>
              <Icon className="w-6 h-6 text-white" />
              {stat.pulse && (
                <span className="absolute inset-0 rounded-xl bg-green-400 animate-ping opacity-75" />
              )}
            </div>
          </div>
          
          <div className="text-4xl mb-2">
            {isLoading ? '...' : count.toLocaleString()}
          </div>
          
          <div className="text-gray-600 dark:text-gray-400">
            {stat.label}
          </div>
        </div>
      </div>
    </motion.div>
  );
}