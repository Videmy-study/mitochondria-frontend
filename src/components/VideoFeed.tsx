
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
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search videos or creators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-2 focus:border-purple-500"
          />
        </div>

        <div className="flex gap-2">
          {sortOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Button
                key={option.value}
                variant={sortBy === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy(option.value)}
                className="gap-2"
              >
                <Icon className="w-4 h-4" />
                {option.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Video Grid */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onLike={(id) => onVideoAction('like', id)}
              onShare={(id) => onVideoAction('share', id)}
              onDownload={(id) => onVideoAction('download', id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No videos found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
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
            className="min-w-[200px]"
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
