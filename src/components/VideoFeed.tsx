
import React, { useState } from 'react';
import VideoCard from './VideoCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, TrendingUp, Clock, Heart } from 'lucide-react';

interface VideoFeedProps {
  videos: any[];
  onVideoAction: (action: string, videoId: string) => void;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

const VideoFeed: React.FC<VideoFeedProps> = ({
  videos,
  onVideoAction,
  onLoadMore,
  hasMore,
  isLoading
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  const sortOptions = [
    { value: 'latest', label: 'Latest', icon: Clock },
    { value: 'trending', label: 'Trending', icon: TrendingUp },
    { value: 'popular', label: 'Most Liked', icon: Heart }
  ];

  const filteredVideos = videos.filter(video =>
    video.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.creator.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Search and Filter Bar */}
      <div className="sticky top-20 z-40 bg-gray-50/95 dark:bg-gray-900/95 backdrop-blur-md p-4 rounded-lg border border-gray-200 dark:border-gray-800">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search videos or creators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-2 focus:border-purple-500 bg-white dark:bg-gray-800"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {sortOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Button
                  key={option.value}
                  variant={sortBy === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy(option.value)}
                  className="gap-2 whitespace-nowrap"
                >
                  <Icon className="w-4 h-4" />
                  {option.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Social Media Style Feed optimized for 9:16 videos */}
      {filteredVideos.length > 0 ? (
        <div className="space-y-8">
          {filteredVideos.map((video, index) => (
            <div 
              key={video.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <VideoCard
                video={video}
                onLike={(id) => onVideoAction('like', id)}
                onShare={(id) => onVideoAction('share', id)}
                onDownload={(id) => onVideoAction('download', id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No videos found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center pt-6">
          <Button
            onClick={onLoadMore}
            variant="outline"
            size="lg"
            disabled={isLoading}
            className="min-w-[200px] bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </div>
            ) : (
              'Load More Videos'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default VideoFeed;
