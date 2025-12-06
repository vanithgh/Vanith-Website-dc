import { motion } from 'motion/react';
import { Shield, Code, Crown, Bot, Loader2, Copy, Check } from 'lucide-react';
import { StaffMember } from '../services/api';
import { useState } from 'react';

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
  'Leck eier Ryze 🖕',
  'Warum tu ich mir das überhaupt an?',
  'Bitte helf mir',
  'Follow Discord Terms of Service',
  'Have fun and be creative!'
];

// Hier kannst du deine Scripts hinzufügen
const scripts = [
  {
    id: 1,
    name: 'Developer Script Hub',
    code: `-- // Developer Script Hub (Mobile-Friendly)
-- Place in StarterGui > ScreenGui > LocalScript
-- Safe for developer/admin use only (not exploits)

local Players = game:GetService("Players")
local UIS = game:GetService("UserInputService")
local RunService = game:GetService("RunService")
local LocalPlayer = Players.LocalPlayer`
  },
  {
    id: 2,
    name: 'Admin Commands',
    code: `-- Admin Commands Script
local Players = game:GetService("Players")
local player = Players.LocalPlayer

function teleport(targetName)
    local target = Players:FindFirstChild(targetName)
    if target then
        player.Character:MoveTo(target.Character.HumanoidRootPart.Position)
    end
end`
  },
  {
    id: 3,
    name: 'Speed Boost',
    code: `-- Speed Boost Script
local player = game.Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local humanoid = character:WaitForChild("Humanoid")

humanoid.WalkSpeed = 50
print("Speed boosted to 50!")`
  }
];

export function ServerInfo({ staff, channels, isLoading }: ServerInfoProps) {
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

          {/* Script Section (ersetzt Channels) */}
          <motion.div
            className="rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-lg border border-gray-200/50 dark:border-white/10 p-8 shadow-xl"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl">Lua Scripts</h3>
              <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                {scripts.length} scripts
              </span>
            </div>
            
            <div className="max-h-[400px] overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-purple-500/30 scrollbar-track-transparent hover:scrollbar-thumb-purple-500/50">
              {scripts.map((script, index) => (
                <ScriptTab key={script.id} script={script} index={index} />
              ))}
            </div>
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

interface ScriptTabProps {
  script: {
    id: number;
    name: string;
    code: string;
  };
  index: number;
}

function ScriptTab({ script, index }: ScriptTabProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Verkürzt den Text wenn er zu lang ist
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <motion.div
      className="rounded-lg bg-white/30 dark:bg-white/5 border border-gray-200/30 dark:border-white/10 p-4 hover:bg-white/40 dark:hover:bg-white/10 transition-all duration-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.1, 0.5) }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
            {script.name}
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
            {truncateText(script.code, 50)}
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="flex-shrink-0 p-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
          title="Copy Script"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
    </motion.div>
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
