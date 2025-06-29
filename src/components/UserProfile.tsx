
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit3, Users, Heart, Video, Instagram, Settings } from 'lucide-react';
import VideoCard from './VideoCard';

interface UserProfileProps {
  user: {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    bio: string;
    followers: number;
    following: number;
    totalLikes: number;
    videosCount: number;
    isOwnProfile: boolean;
    isFollowing?: boolean;
  };
  videos: any[];
  prompts: string[];
  onFollow: (userId: string) => void;
  onEditProfile: () => void;
  onVideoAction: (action: string, videoId: string) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  videos,
  prompts,
  onFollow,
  onEditProfile,
  onVideoAction
}) => {
  const [activeTab, setActiveTab] = useState('videos');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-32 h-32 ring-4 ring-white shadow-lg">
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                {user.displayName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{user.displayName}</h1>
                <p className="text-xl text-gray-600">@{user.username}</p>
              </div>

              <p className="text-gray-700 max-w-2xl">{user.bio}</p>

              {/* Stats */}
              <div className="flex justify-center md:justify-start gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.videosCount}</div>
                  <div className="text-sm text-gray-600">Videos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.followers}</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.following}</div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.totalLikes}</div>
                  <div className="text-sm text-gray-600">Likes</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center md:justify-start gap-3">
                {user.isOwnProfile ? (
                  <>
                    <Button onClick={onEditProfile} className="gap-2">
                      <Edit3 className="w-4 h-4" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Settings className="w-4 h-4" />
                      Settings
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => onFollow(user.id)}
                      variant={user.isFollowing ? "outline" : "default"}
                      className="gap-2"
                    >
                      <Users className="w-4 h-4" />
                      {user.isFollowing ? 'Following' : 'Follow'}
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Instagram className="w-4 h-4" />
                      Share Profile
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="videos" className="gap-2">
            <Video className="w-4 h-4" />
            Videos ({user.videosCount})
          </TabsTrigger>
          <TabsTrigger value="prompts" className="gap-2">
            <Edit3 className="w-4 h-4" />
            Prompts ({prompts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="space-y-6">
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
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
            <Card className="p-12 text-center bg-gray-50">
              <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No videos yet</h3>
              <p className="text-gray-500">Start creating amazing AI videos!</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="prompts" className="space-y-4">
          {prompts.length > 0 ? (
            <div className="grid gap-4">
              {prompts.map((prompt, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                  <p className="text-gray-700">{prompt}</p>
                  <div className="flex justify-end mt-2">
                    <Button size="sm" variant="outline">
                      Use Again
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center bg-gray-50">
              <Edit3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No prompts saved</h3>
              <p className="text-gray-500">Your prompt history will appear here</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
