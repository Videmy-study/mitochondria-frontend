
import React, { useState, useEffect } from 'react';
import VideoCard from './VideoCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, TrendingUp, Clock, Heart } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface VideoFeedProps {
  videos: any[];
  onVideoAction: (action: string, videoId: string) => void;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  layout?: 'carousel' | 'grid';
}

const VideoFeed: React.FC<VideoFeedProps> = ({
  videos,
  onVideoAction,
  onLoadMore,
  hasMore,
  isLoading,
  layout = 'carousel'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const sortOptions = [
    { value: 'latest', label: 'Latest', icon: Clock },
    { value: 'trending', label: 'Trending', icon: TrendingUp },
    { value: 'popular', label: 'Most Liked', icon: Heart }
  ];

  const filteredVideos = videos.filter(video =>
    video.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.creator.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Auto-scroll effect - only for carousel layout
  useEffect(() => {
    if (!api || layout !== 'carousel') return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0); // Loop back to first video
      }
    }, 5000); // Auto-scroll every 5 seconds

    return () => clearInterval(interval);
  }, [api, layout]);

  useEffect(() => {
    if (!api || layout !== 'carousel') return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, layout]);

  const handleDotClick = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div className={layout === 'carousel' ? 'max-w-md mx-auto space-y-6' : 'max-w-4xl mx-auto space-y-6'}>
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

      {/* Conditional Layout Rendering */}
      {filteredVideos.length > 0 ? (
        layout === 'carousel' ? (
          // Carousel Layout for Home Page
          <div className="space-y-4">
            <Carousel
              setApi={setApi}
              className="w-full max-w-md mx-auto"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                {filteredVideos.map((video, index) => (
                  <CarouselItem key={video.id}>
                    <div className="p-1">
                      <VideoCard
                        video={video}
                        onLike={(id) => onVideoAction('like', id)}
                        onShare={(id) => onVideoAction('share', id)}
                        onDownload={(id) => onVideoAction('download', id)}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 py-4">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === current - 1
                      ? 'bg-purple-600 scale-125 shadow-lg shadow-purple-500/50'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Go to video ${index + 1}`}
                />
              ))}
            </div>

            {/* Video Counter */}
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Video {current} of {count}
              </p>
            </div>
          </div>
        ) : (
          // Grid Layout for Explore Page
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
        )
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
