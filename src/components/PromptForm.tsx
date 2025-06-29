
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Sparkles, Video, Music, Clock } from 'lucide-react';

interface PromptFormData {
  prompt: string;
  style: string;
  duration: number;
  music: string;
}

interface PromptFormProps {
  onSubmit: (data: PromptFormData) => void;
  isLoading?: boolean;
}

const PromptForm: React.FC<PromptFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<PromptFormData>({
    prompt: '',
    style: 'cinematic',
    duration: 30,
    music: 'upbeat'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.prompt.trim()) {
      onSubmit(formData);
    }
  };

  const videoStyles = [
    { value: 'cinematic', label: 'Cinematic', description: 'Movie-like with dramatic lighting' },
    { value: 'animation', label: 'Animation', description: 'Cartoon and animated style' },
    { value: 'whiteboard', label: 'Whiteboard', description: 'Hand-drawn explanatory style' },
    { value: 'documentary', label: 'Documentary', description: 'Real-life narrative style' },
    { value: 'abstract', label: 'Abstract', description: 'Artistic and surreal visuals' },
    { value: 'retro', label: 'Retro', description: 'Vintage 80s/90s aesthetic' }
  ];

  const musicOptions = [
    { value: 'upbeat', label: 'Upbeat', description: 'Energetic and positive' },
    { value: 'calm', label: 'Calm', description: 'Peaceful and relaxing' },
    { value: 'dramatic', label: 'Dramatic', description: 'Intense and emotional' },
    { value: 'electronic', label: 'Electronic', description: 'Modern electronic beats' },
    { value: 'ambient', label: 'Ambient', description: 'Atmospheric background' },
    { value: 'none', label: 'No Music', description: 'Silent video' }
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="text-center space-y-2 pb-6">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-purple-600" />
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Create AI Video
          </CardTitle>
        </div>
        <p className="text-gray-600">Transform your ideas into stunning videos with AI</p>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Prompt Input */}
          <div className="space-y-2">
            <Label htmlFor="prompt" className="text-base font-semibold flex items-center gap-2">
              <Video className="w-4 h-4" />
              Video Description
            </Label>
            <Textarea
              id="prompt"
              placeholder="Describe your video idea in detail... (e.g., 'A golden retriever playing in a sunny meadow with butterflies floating around')"
              value={formData.prompt}
              onChange={(e) => setFormData(prev => ({ ...prev, prompt: e.target.value }))}
              className="min-h-[120px] resize-none border-2 focus:border-purple-500 transition-colors"
              required
            />
            <p className="text-sm text-gray-500">
              {formData.prompt.length}/500 characters
            </p>
          </div>

          {/* Video Style */}
          <div className="space-y-2">
            <Label className="text-base font-semibold">Video Style</Label>
            <Select value={formData.style} onValueChange={(value) => setFormData(prev => ({ ...prev, style: value }))}>
              <SelectTrigger className="border-2 focus:border-purple-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {videoStyles.map((style) => (
                  <SelectItem key={style.value} value={style.value}>
                    <div>
                      <div className="font-medium">{style.label}</div>
                      <div className="text-sm text-gray-500">{style.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Duration Slider */}
          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Duration: {formData.duration} seconds
            </Label>
            <Slider
              value={[formData.duration]}
              onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value[0] }))}
              max={60}
              min={10}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>10s</span>
              <span>60s</span>
            </div>
          </div>

          {/* Background Music */}
          <div className="space-y-2">
            <Label className="text-base font-semibold flex items-center gap-2">
              <Music className="w-4 h-4" />
              Background Music
            </Label>
            <Select value={formData.music} onValueChange={(value) => setFormData(prev => ({ ...prev, music: value }))}>
              <SelectTrigger className="border-2 focus:border-purple-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {musicOptions.map((music) => (
                  <SelectItem key={music.value} value={music.value}>
                    <div>
                      <div className="font-medium">{music.label}</div>
                      <div className="text-sm text-gray-500">{music.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            disabled={!formData.prompt.trim() || isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating Video...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Generate Video
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PromptForm;
