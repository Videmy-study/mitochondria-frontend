
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import VideoFeed from '../components/VideoFeed';
import PromptForm from '../components/PromptForm';
import UserProfile from '../components/UserProfile';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Play } from 'lucide-react';

const Index = () => {
  const [currentView, setCurrentView] = useState<'feed' | 'create' | 'profile'>('feed');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  // Mock data
  const [videos, setVideos] = useState([
    {
      id: '1',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500',
      prompt: 'A majestic golden retriever running through a sunlit meadow with butterflies dancing around, shot in cinematic style with warm lighting',
      creator: { username: 'alex_creates', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
      likes: 234,
      comments: 45,
      style: 'Cinematic',
      duration: 30,
      isLiked: false
    },
    {
      id: '2',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=500',
      prompt: 'Abstract geometric shapes morphing and transforming in a vibrant digital space with neon colors',
      creator: { username: 'digital_artist', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b19c?w=100' },
      likes: 189,
      comments: 32,
      style: 'Abstract',
      duration: 45,
      isLiked: true
    },
    {
      id: '3',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500',
      prompt: 'A cozy coffee shop in the rain with people working on laptops, warm interior lighting, documentary style',
      creator: { username: 'story_teller', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
      likes: 156,
      comments: 28,
      style: 'Documentary',
      duration: 25,
      isLiked: false
    }
  ]);

  const [currentUser] = useState({
    id: '1',
    username: 'you',
    displayName: 'Your Name',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    bio: 'AI video creator passionate about bringing stories to life',
    followers: 245,
    following: 189,
    totalLikes: 1234,
    videosCount: 12,
    isOwnProfile: true
  });

  const handleVideoAction = (action: string, videoId: string) => {
    switch (action) {
      case 'like':
        setVideos(prev => prev.map(video => 
          video.id === videoId 
            ? { 
                ...video, 
                isLiked: !video.isLiked,
                likes: video.isLiked ? video.likes - 1 : video.likes + 1
              }
            : video
        ));
        break;
      case 'share':
        toast({
          title: 'Video shared!',
          description: 'Share link copied to clipboard',
        });
        break;
      case 'download':
        toast({
          title: 'Download started',
          description: 'Your video is being downloaded',
        });
        break;
    }
  };

  const handleCreateVideo = async (formData: any) => {
    setIsGenerating(true);
    
    // Simulate video generation
    setTimeout(() => {
      const newVideo = {
        id: Date.now().toString(),
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500',
        prompt: formData.prompt,
        creator: { username: currentUser.username, avatar: currentUser.avatar },
        likes: 0,
        comments: 0,
        style: formData.style,
        duration: formData.duration,
        isLiked: false
      };

      setVideos(prev => [newVideo, ...prev]);
      setIsGenerating(false);
      setShowCreateDialog(false);
      
      toast({
        title: 'Video generated successfully!',
        description: 'Your AI video has been created and added to your profile',
      });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={currentUser}
        onCreateVideo={() => setShowCreateDialog(true)}
        onLogin={() => toast({ title: 'Login feature coming soon!' })}
        onLogout={() => toast({ title: 'Logged out successfully' })}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'feed' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 py-12">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Create Amazing Videos
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Transform your ideas into stunning AI-generated videos in seconds
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <button
                  onClick={() => setShowCreateDialog(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Start Creating
                </button>
              </div>
            </div>

            <VideoFeed
              videos={videos}
              onVideoAction={handleVideoAction}
              onLoadMore={() => toast({ title: 'No more videos to load' })}
              hasMore={false}
              isLoading={false}
            />
          </div>
        )}

        {currentView === 'profile' && (
          <UserProfile
            user={currentUser}
            videos={videos.filter(v => v.creator.username === currentUser.username)}
            prompts={['A golden retriever in a meadow', 'Abstract shapes in neon colors']}
            onFollow={() => {}}
            onEditProfile={() => toast({ title: 'Edit profile coming soon!' })}
            onVideoAction={handleVideoAction}
          />
        )}
      </main>

      {/* Create Video Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="sr-only">Create AI Video</DialogTitle>
          </DialogHeader>
          <PromptForm onSubmit={handleCreateVideo} isLoading={isGenerating} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
