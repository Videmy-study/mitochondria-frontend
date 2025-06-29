
import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Download, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface VideoCardProps {
  video: {
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
    isLiked?: boolean;
  };
  onLike: (videoId: string) => void;
  onShare: (videoId: string) => void;
  onDownload: (videoId: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onLike, onShare, onDownload }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFullPrompt, setShowFullPrompt] = useState(false);

  const truncatedPrompt = video.prompt.length > 100 
    ? video.prompt.substring(0, 100) + '...' 
    : video.prompt;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
      {/* Video Section with 9:16 aspect ratio */}
      <div className="relative bg-gray-900 group cursor-pointer">
        <AspectRatio ratio={9/16} className="w-full">
          <video
            className="w-full h-full object-cover"
            poster={video.thumbnail}
            muted
            loop
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <source src={video.videoUrl} type="video/mp4" />
          </video>
          
          {/* Play/Pause Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {isPlaying ? (
              <Pause className="w-16 h-16 text-white drop-shadow-lg" />
            ) : (
              <Play className="w-16 h-16 text-white drop-shadow-lg" />
            )}
          </div>

          {/* Style Tag */}
          <div className="absolute top-3 left-3">
            <span className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
              {video.style}
            </span>
          </div>

          {/* Duration */}
          <div className="absolute top-3 right-3">
            <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm backdrop-blur-sm">
              {video.duration}s
            </span>
          </div>
        </AspectRatio>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Creator Info */}
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-10 h-10 ring-2 ring-gray-100 dark:ring-gray-600">
            <AvatarImage src={video.creator.avatar} alt={video.creator.username} />
            <AvatarFallback>{video.creator.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100">@{video.creator.username}</p>
          </div>
        </div>

        {/* Prompt */}
        <div className="mb-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {showFullPrompt ? video.prompt : truncatedPrompt}
          </p>
          {video.prompt.length > 100 && (
            <button
              onClick={() => setShowFullPrompt(!showFullPrompt)}
              className="text-blue-600 dark:text-blue-400 text-sm font-medium mt-1 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              {showFullPrompt ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onLike(video.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200 ${
                video.isLiked
                  ? 'text-red-500 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30'
                  : 'text-gray-600 dark:text-gray-400 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${video.isLiked ? 'fill-current' : ''}`} />
              <span className="font-medium">{video.likes}</span>
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-full text-gray-600 dark:text-gray-400 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-200">
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">{video.comments}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onShare(video.id)}
              className="rounded-full dark:border-gray-600 dark:hover:bg-gray-700"
            >
              <Share className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDownload(video.id)}
              className="rounded-full dark:border-gray-600 dark:hover:bg-gray-700"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
