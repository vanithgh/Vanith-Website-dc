import { motion, AnimatePresence } from 'motion/react';
import { UserPlus, UserMinus, MessageCircle, Bell, FileText, Paperclip, AtSign } from 'lucide-react';
import { Activity } from '../services/api';

interface ActivityFeedProps {
  activities?: Activity[];
  isLoading: boolean;
}

const activityTypes = {
  join: { icon: UserPlus, color: 'text-green-500', bgColor: 'bg-green-500/20' },
  leave: { icon: UserMinus, color: 'text-red-500', bgColor: 'bg-red-500/20' },
  message: { icon: MessageCircle, color: 'text-purple-500', bgColor: 'bg-purple-500/20' },
  log: { icon: FileText, color: 'text-blue-500', bgColor: 'bg-blue-500/20' }
};

export function ActivityFeed({ activities, isLoading }: ActivityFeedProps) {
  const displayActivities = activities || [];

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl mb-12 text-center bg-gradient-to-r from-purple-400 to-purple-600 dark:from-purple-300 dark:to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Live Activity Feed
        </motion.h2>

        <motion.div
          className="relative rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-lg border border-gray-200/50 dark:border-white/10 p-6 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {isLoading ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              Loading activities...
            </div>
          ) : displayActivities.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              No recent activities
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              <AnimatePresence mode="popLayout">
                {displayActivities.map((activity, idx) => {
                  const config = activityTypes[activity.type];
                  const Icon = config.icon;

                  const timeAgo = () => {
                    const activityDate = new Date(activity.time);
                    const seconds = Math.floor((new Date().getTime() - activityDate.getTime()) / 1000);
                    if (seconds < 60) return `${seconds}s ago`;
                    const minutes = Math.floor(seconds / 60);
                    if (minutes < 60) return `${minutes}m ago`;
                    const hours = Math.floor(minutes / 60);
                    return `${hours}h ago`;
                  };

                  return (
                    <motion.div
                      key={`${activity.time}-${idx}`}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-3 p-4 rounded-xl bg-white/30 dark:bg-white/5 hover:bg-white/50 dark:hover:bg-white/10 transition-colors duration-200 border border-gray-200/30 dark:border-white/5"
                    >
                      {/* Main Activity Row */}
                      <div className="flex items-center gap-4">
                        {/* Activity Icon */}
                        <div className={`p-2 rounded-lg ${config.bgColor} flex-shrink-0`}>
                          <Icon className={`w-5 h-5 ${config.color}`} />
                        </div>

                        {/* User Avatar */}
                        {activity.avatar && (
                          <img
                            src={activity.avatar}
                            alt={activity.displayName}
                            className="w-10 h-10 rounded-full flex-shrink-0 border-2 border-white/20"
                          />
                        )}
                        
                        {/* Activity Content */}
                        <div className="flex-1 min-w-0">
                          <div className="text-gray-800 dark:text-gray-200">
                            <span 
                              className="font-medium"
                              style={{ color: activity.authorRoleColor || '#A855F7' }}
                            >
                              {activity.displayName}
                            </span>
                            {activity.isBot && (
                              <span className="ml-2 px-2 py-0.5 text-xs bg-blue-500/20 text-blue-500 rounded">
                                BOT
                              </span>
                            )}
                            {activity.authorRole && activity.authorRole !== 'Member' && (
                              <span 
                                className="ml-2 px-2 py-0.5 text-xs rounded"
                                style={{ 
                                  backgroundColor: `${activity.authorRoleColor}20`,
                                  color: activity.authorRoleColor 
                                }}
                              >
                                {activity.authorRole}
                              </span>
                            )}
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {activity.action}
                            </div>
                          </div>
                        </div>

                        {/* Timestamp */}
                        <div className="text-gray-500 dark:text-gray-500 text-sm whitespace-nowrap flex-shrink-0">
                          {timeAgo()}
                        </div>
                      </div>

                      {/* Message Content (if exists) */}
                      {activity.content && (
                        <div className="ml-16 pl-4 border-l-2 border-purple-500/30">
                          <div className="text-sm text-gray-700 dark:text-gray-300 break-words">
                            {activity.content}
                          </div>
                          
                          {/* Attachments Badge */}
                          {activity.hasAttachments && (
                            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                              <Paperclip className="w-3 h-3" />
                              <span>{activity.attachments} attachment{activity.attachments !== 1 ? 's' : ''}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Mentions (if any) */}
                      {activity.hasMentions && activity.mentions && activity.mentions.length > 0 && (
                        <div className="ml-16 flex items-center gap-2 flex-wrap">
                          <AtSign className="w-4 h-4 text-purple-500" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">Mentioned:</span>
                          {activity.mentions.map((mention, i) => (
                            <div key={i} className="flex items-center gap-1.5 px-2 py-1 bg-purple-500/10 rounded-full">
                              <img 
                                src={mention.avatar} 
                                alt={mention.username}
                                className="w-4 h-4 rounded-full"
                              />
                              <span className="text-xs text-purple-600 dark:text-purple-400">
                                @{mention.username}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Log Channel Badge */}
                      {activity.isLogChannel && (
                        <div className="ml-16">
                          <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs rounded">
                            <FileText className="w-3 h-3" />
                            Log Channel
                          </span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}