const API_URL = "https://unmisanthropically-multiplicative-dorian.ngrok-free.dev/api/all";

// Mock data bleibt gleich...
const MOCK_DATA: DiscordData = {
  // ... (dein bisheriger Mock Data Code)
  stats: {
    totalMembers: 12847,
    onlineMembers: 3456,
    messagesToday: 8923,
  },
  activities: [],
  channels: [],
  roles: [],
  staff: {
    owner: [],
    moderators: [],
    bots: [],
    members: [],
  },
  timestamp: new Date().toISOString(),
};

export interface Activity {
  type: "join" | "leave" | "message" | "log";
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
  isServerOwner?: boolean;
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
    members: StaffMember[];
  };
  timestamp: string;
}

export async function fetchDiscordData(): Promise<DiscordData> {
  console.log('[API] Fetching data from:', API_URL);
  
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'User-Agent': 'VanithWebsite/1.0',
        'Accept': 'application/json',
      },
      mode: 'cors', // Explizit CORS aktivieren
      cache: 'no-cache', // Kein Caching
    });

    console.log('[API] Response status:', response.status);
    console.log('[API] Response headers:', response.headers);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('[API] Data received:', data);
    
    // Validierung: Prüfe ob staff.members existiert
    if (!data.staff || !data.staff.members) {
      console.warn('[API] Warning: staff.members is missing!');
      data.staff = data.staff || {};
      data.staff.members = [];
    }

    console.log('[API] Members count:', data.staff.members.length);
    
    return data;
  } catch (error) {
    console.error('[API] Error fetching Discord data:', error);
    console.log('[API] Using mock data as fallback');
    return MOCK_DATA;
  }
}
