const API_URL = 'http://localhost:3000/api/all';

// Mock data for when API is not available
const MOCK_DATA: DiscordData = {
  stats: {
    totalMembers: 12847,
    onlineMembers: 3456,
    messagesToday: 8923
  },
  activities: [
    {
      type: 'join',
      user: 'NewUser123',
      userId: '123',
      displayName: 'NewUser123',
      action: 'joined the server',
      time: new Date(Date.now() - 120000).toISOString(),
      avatar: 'https://cdn.discordapp.com/embed/avatars/0.png',
      isBot: false
    },
    {
      type: 'message',
      user: 'AdminUser',
      userId: '456',
      displayName: 'AdminUser',
      action: 'sent a message in #general',
      time: new Date(Date.now() - 300000).toISOString(),
      avatar: 'https://cdn.discordapp.com/embed/avatars/1.png',
      content: 'Welcome to Vanith Community!',
      channelName: 'general',
      authorRole: 'Admin',
      authorRoleColor: '#A855F7'
    },
    {
      type: 'message',
      user: 'Moderator',
      userId: '789',
      displayName: 'Moderator',
      action: 'sent a message in #announcements',
      time: new Date(Date.now() - 600000).toISOString(),
      avatar: 'https://cdn.discordapp.com/embed/avatars/2.png',
      content: 'New event starting this weekend! Join us for gaming sessions.',
      channelName: 'announcements',
      authorRole: 'Moderator',
      authorRoleColor: '#A855F7',
      mentions: [
        {
          id: '111',
          username: 'User1',
          avatar: 'https://cdn.discordapp.com/embed/avatars/3.png'
        }
      ],
      hasMentions: true
    }
  ],
  channels: [
    { id: '1', name: 'general', position: 0 },
    { id: '2', name: 'announcements', position: 1 },
    { id: '3', name: 'gaming', position: 2 },
    { id: '4', name: 'creative', position: 3 }
  ],
  roles: [
    { id: '1', name: 'Admin', color: '#A855F7', memberCount: 5 },
    { id: '2', name: 'Moderator', color: '#3B82F6', memberCount: 12 },
    { id: '3', name: 'Member', color: '#9CA3AF', memberCount: 1200 }
  ],
  staff: {
    owner: [
      {
        id: '1',
        username: 'Vanith Owner',
        displayName: 'Vanith Owner',
        avatar: 'https://cdn.discordapp.com/embed/avatars/4.png',
        role: 'Owner',
        roleColor: '#ef4444'
      }
    ],
    moderators: [
      {
        id: '2',
        username: 'Mod User1',
        displayName: 'Mod User 1',
        avatar: 'https://cdn.discordapp.com/embed/avatars/5.png',
        role: 'Moderator',
        roleColor: '#A855F7',
        permissions: {
          admin: false,
          kick: true,
          ban: true
        }
      },
      {
        id: '3',
        username: 'Mod User2',
        displayName: 'Mod User 2',
        avatar: 'https://cdn.discordapp.com/embed/avatars/0.png',
        role: 'Moderator',
        roleColor: '#A855F7',
        permissions: {
          admin: true,
          kick: true,
          ban: true
        }
      }
    ],
    bots: [
      {
        id: '4',
        username: 'Vanith Bot',
        displayName: 'Vanith Bot',
        avatar: 'https://cdn.discordapp.com/embed/avatars/1.png',
        role: 'Bot',
        roleColor: '#3b82f6'
      }
    ]
  },
  timestamp: new Date().toISOString()
};

export interface Activity {
  type: 'join' | 'leave' | 'message' | 'log';
  user: string;
  userId: string;
  displayName: string;
  action: string;
  time: string;
  avatar: string;
  isBot?: boolean;
  content?: string;
  channelName?: string;
  channelId?: string;
  mentions?: Array<{
    id: string;
    username: string;
    avatar: string;
  }>;
  hasMentions?: boolean;
  isLogChannel?: boolean;
  authorRole?: string;
  authorRoleColor?: string;
  attachments?: number;
  hasAttachments?: boolean;
}

export interface StaffMember {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  role: string;
  roleColor: string;
  permissions?: {
    admin?: boolean;
    kick?: boolean;
    ban?: boolean;
  };
}

export interface DiscordData {
  stats: {
    totalMembers: number;
    onlineMembers: number;
    messagesToday: number;
  };
  activities: Activity[];
  channels: Array<{
    id: string;
    name: string;
    position: number;
  }>;
  roles: Array<{
    id: string;
    name: string;
    color: string;
    memberCount: number;
  }>;
  staff: {
    owner: StaffMember[];
    moderators: StaffMember[];
    bots: StaffMember[];
  };
  timestamp: string;
}

export async function fetchDiscordData(): Promise<DiscordData> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch Discord data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Discord data:', error);
    console.log('Using mock data as fallback');
    // Return mock data when API is not available
    return MOCK_DATA;
  }
}