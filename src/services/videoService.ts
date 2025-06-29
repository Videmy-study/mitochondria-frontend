// Video service for API integration
const API_BASE_URL = 'https://api.getreals.club';

export interface VideoData {
  id: string;
  generation_prompt: string;
  scheduled_time: string;
  video_url: string;
  hashtags: string[];
  caption: string;
  status: string;
  insta_acc_id: string;
  user_id: string;
  created_at: string;
}

export interface TransformedVideo {
  id: string;
  videoUrl: string;
  thumbnail: string;
  prompt: string;
  creator: {
    username: string;
    avatar: string;
  };
  likes: number;
  comments: number;
  style: string;
  duration: number;
  isLiked: boolean;
  status: string;
  hashtags: string[];
  caption: string;
  createdAt: string;
}

class VideoService {
  private async fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 5000): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  async fetchVideos(): Promise<VideoData[]> {
    try {
      const response = await this.fetchWithTimeout(`${API_BASE_URL}/videos/`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const videos = await response.json();
      return Array.isArray(videos) ? videos : [];
    } catch (error) {
      console.error('Error fetching videos:', error);
      return [];
    }
  }

  async fetchVideoDetails(videoId: string): Promise<VideoData | null> {
    try {
      const response = await this.fetchWithTimeout(`${API_BASE_URL}/videos/${videoId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching video ${videoId}:`, error);
      return null;
    }
  }

  transformVideoData(apiVideo: VideoData): TransformedVideo {
    // Generate a placeholder thumbnail if none exists
    const thumbnail = apiVideo.video_url || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500';
    
    // Extract style from prompt or use default
    const style = this.extractStyleFromPrompt(apiVideo.generation_prompt);
    
    // Generate mock creator data (you can enhance this later with real user data)
    const creator = {
      username: `user_${apiVideo.user_id.slice(-6)}`,
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&v=${apiVideo.user_id}`
    };

    return {
      id: apiVideo.id,
      videoUrl: apiVideo.video_url,
      thumbnail,
      prompt: apiVideo.generation_prompt,
      creator,
      likes: Math.floor(Math.random() * 500) + 50, // Mock likes for now
      comments: Math.floor(Math.random() * 100) + 10, // Mock comments for now
      style,
      duration: 30, // Default duration
      isLiked: false,
      status: apiVideo.status,
      hashtags: apiVideo.hashtags,
      caption: apiVideo.caption,
      createdAt: apiVideo.created_at
    };
  }

  private extractStyleFromPrompt(prompt: string): string {
    const promptLower = prompt.toLowerCase();
    
    if (promptLower.includes('cinematic') || promptLower.includes('movie')) return 'Cinematic';
    if (promptLower.includes('animation') || promptLower.includes('cartoon')) return 'Animation';
    if (promptLower.includes('whiteboard') || promptLower.includes('drawing')) return 'Whiteboard';
    if (promptLower.includes('documentary') || promptLower.includes('real')) return 'Documentary';
    if (promptLower.includes('abstract') || promptLower.includes('artistic')) return 'Abstract';
    if (promptLower.includes('retro') || promptLower.includes('vintage')) return 'Retro';
    
    return 'Creative'; // Default style
  }

  async loadAllVideos(): Promise<TransformedVideo[]> {
    try {
      // Fetch video list
      const videoList = await this.fetchVideos();
      
      if (videoList.length === 0) {
        return [];
      }

      // Fetch details for each video
      const videoPromises = videoList.map(video => this.fetchVideoDetails(video.id));
      const videoDetails = await Promise.all(videoPromises);
      
      // Transform and filter out null results
      const transformedVideos = videoDetails
        .filter((video): video is VideoData => video !== null)
        .map(video => this.transformVideoData(video));

      return transformedVideos;
    } catch (error) {
      console.error('Error loading all videos:', error);
      return [];
    }
  }
}

export const videoService = new VideoService(); 