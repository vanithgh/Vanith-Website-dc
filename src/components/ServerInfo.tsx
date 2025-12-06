import { motion } from 'motion/react';
import { Shield, Hash, Crown, Users, Bot, Loader2 } from 'lucide-react';
import { StaffMember } from '../services/api';

interface ServerInfoProps {
  staff?: {
    owner: StaffMember[];
    moderators: StaffMember[];
    bots: StaffMember[];
  };
  channels?: Array<{
    id: string;
    name: string;
    position: number;
  }>;
  isLoading: boolean;
}

const rules = [
  'Be respectful to all members',
  'No spam or self-promotion',
  'Keep content appropriate',
  'Follow Discord Terms of Service',
  'Have fun and be creative!'
];

export function ServerInfo({ staff, channels, isLoading }: ServerInfoProps) {
  const displayChannels = channels?.slice(0, 6) || [];

  return (
    <section className="relative py-20 px-6 pb-32">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl mb-16 text-center bg-gradient-to-r from-purple-400 to-purple-600 dark:from-purple-300 dark:to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Server Information
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Rules Section */}
          <motion.div
            className="rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-lg border border-gray-200/50 dark:border-white/10 p-8 shadow-xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl">Server Rules</h3>
            </div>
            
            <ul className="space-y-3">
              {rules.map((rule, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <span className="text-purple-500 mt-1">•</span>
                  <span>{rule}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Channels Section */}
          <motion.div
            className="rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-lg border border-gray-200/50 dark:border-white/10 p-8 shadow-xl"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700">
                <Hash className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl">Popular Channels</h3>
            </div>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
              </div>
            ) : displayChannels.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                No channels available
              </div>
            ) : (
              <div className="space-y-3">
                {displayChannels.map((channel, index) => (
                  <motion.div
                    key={channel.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/30 dark:bg-white/5 hover:bg-white/50 dark:hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <Hash className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <div className="flex-1">
                      <div className="text-gray-800 dark:text-gray-200">{channel.name}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Staff Team Section */}
        <motion.div
          className="rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-lg border border-gray-200/50 dark:border-white/10 p-8 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl">Staff Team</h3>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
            </div>
          ) : !staff ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              No staff data available
            </div>
          ) : (
            <div className="space-y-8">
              {/* Owner */}
              {staff.owner && staff.owner.length > 0 && (
                <div>
                  <h4 className="text-lg mb-4 text-gray-700 dark:text-gray-300">Server Owner</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {staff.owner.map((member, index) => (
                      <StaffCard key={member.id} member={member} index={index} />
                    ))}
                  </div>
                </div>
              )}

              {/* Moderators */}
              {staff.moderators && staff.moderators.length > 0 && (
                <div>
                  <h4 className="text-lg mb-4 text-gray-700 dark:text-gray-300">
                    Moderators ({staff.moderators.length})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {staff.moderators.map((member, index) => (
                      <StaffCard key={member.id} member={member} index={index} />
                    ))}
                  </div>
                </div>
              )}

              {/* Bots */}
              {staff.bots && staff.bots.length > 0 && (
                <div>
                  <h4 className="text-lg mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    Bots ({staff.bots.length})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {staff.bots.map((member, index) => (
                      <StaffCard key={member.id} member={member} index={index} isBot />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

interface StaffCardProps {
  member: StaffMember;
  index: number;
  isBot?: boolean;
}

function StaffCard({ member, index, isBot }: StaffCardProps) {
  return (
    <motion.div
      className="p-6 rounded-xl bg-white/30 dark:bg-white/5 hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-300 group cursor-pointer border border-gray-200/30 dark:border-white/5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="relative mb-4 group-hover:scale-110 transition-transform duration-300">
          <img
            src={member.avatar}
            alt={member.displayName}
            className="w-20 h-20 rounded-full border-4"
            style={{ borderColor: member.roleColor }}
          />
          {isBot && (
            <div className="absolute -bottom-1 -right-1 p-1.5 bg-blue-500 rounded-full">
              <Bot className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        {/* Name */}
        <div className="text-gray-800 dark:text-gray-200 mb-1">
          {member.displayName}
        </div>
        
        {/* Username */}
        <div className="text-sm text-gray-600 dark:text-gray-500 mb-2">
          @{member.username}
        </div>

        {/* Role Badge */}
        <div
          className="px-3 py-1 rounded-full text-sm"
          style={{
            backgroundColor: `${member.roleColor}20`,
            color: member.roleColor
          }}
        >
          {member.role}
        </div>

        {/* Permissions (for moderators) */}
        {member.permissions && (
          <div className="flex gap-2 mt-3 text-xs">
            {member.permissions.admin && (
              <span className="px-2 py-1 bg-red-500/20 text-red-500 rounded">Admin</span>
            )}
            {member.permissions.kick && (
              <span className="px-2 py-1 bg-orange-500/20 text-orange-500 rounded">Kick</span>
            )}
            {member.permissions.ban && (
              <span className="px-2 py-1 bg-red-500/20 text-red-500 rounded">Ban</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
