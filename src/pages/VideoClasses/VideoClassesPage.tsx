import React, { useState, useEffect } from 'react';
import { Youtube, Plus, Trash2, Play, Link as LinkIcon } from 'lucide-react';
import { Button, Card } from '../../components/ui';

interface Video {
  id: string;
  title: string;
  videoId: string;
}

export function VideoClassesPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [newUrl, setNewUrl] = useState('');
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('skillhub_videos');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setVideos(parsed);
        if (parsed.length > 0) setActiveVideo(parsed[0]);
      } catch (e) {}
    }
  }, []);

  const saveVideos = (newVideos: Video[]) => {
    setVideos(newVideos);
    localStorage.setItem('skillhub_videos', JSON.stringify(newVideos));
  };

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const videoId = extractVideoId(newUrl);
    if (!videoId) {
      alert("Invalid YouTube URL");
      return;
    }
    
    const newVideo: Video = {
      id: Date.now().toString(),
      title: `Video Class ${videos.length + 1}`,
      videoId: videoId
    };

    const updated = [...videos, newVideo];
    saveVideos(updated);
    setNewUrl('');
    if (!activeVideo) setActiveVideo(newVideo);
  };

  const removeVideo = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = videos.filter(v => v.id !== id);
    saveVideos(updated);
    if (activeVideo?.id === id) {
      setActiveVideo(updated.length > 0 ? updated[0] : null);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Youtube className="text-red-500" size={32} /> Video Classes
        </h1>
        <p className="text-gray-400">Add YouTube links to watch and learn directly within the app.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0 pb-10">
        {/* Left Side: Player */}
        <div className="lg:w-2/3 flex flex-col">
          {activeVideo ? (
            <div className="bg-surface-800 rounded-2xl border border-white/[0.06] overflow-hidden flex-1 min-h-[400px] flex flex-col">
              <div className="relative w-full pb-[56.25%] bg-black">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-2">{activeVideo.title}</h2>
                <p className="text-gray-400">Video ID: {activeVideo.videoId}</p>
              </div>
            </div>
          ) : (
            <div className="bg-surface-800 rounded-2xl border border-white/[0.06] flex-1 flex flex-col items-center justify-center text-gray-500 min-h-[400px]">
              <Youtube size={64} className="mb-4 opacity-20" />
              <p>No video selected. Add a link to get started.</p>
            </div>
          )}
        </div>

        {/* Right Side: List & Add Form */}
        <div className="lg:w-1/3 flex flex-col gap-6">
          <Card className="p-5" hover={false}>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <LinkIcon size={18} /> Add New Class
            </h3>
            <form onSubmit={handleAddVideo} className="flex gap-2">
              <input
                type="text"
                placeholder="Paste YouTube URL..."
                value={newUrl}
                onChange={e => setNewUrl(e.target.value)}
                className="flex-1 bg-surface-900 border border-white/[0.06] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
              />
              <Button type="submit" variant="primary" disabled={!newUrl}>
                <Plus size={18} />
              </Button>
            </form>
          </Card>

          <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Your Classes</h3>
            {videos.length === 0 && (
              <div className="text-center p-8 bg-surface-800/50 rounded-xl border border-white/[0.02]">
                <p className="text-sm text-gray-500">Your playlist is empty.</p>
              </div>
            )}
            {videos.map(video => (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className={`
                  flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all group
                  ${activeVideo?.id === video.id 
                    ? 'bg-brand-600/20 border border-brand-500/30' 
                    : 'bg-surface-800 border border-white/[0.06] hover:border-white/[0.1]'}
                `}
              >
                <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-surface-900">
                  <img 
                    src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`} 
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={20} className="text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-semibold text-sm truncate ${activeVideo?.id === video.id ? 'text-brand-400' : 'text-white'}`}>
                    {video.title}
                  </h4>
                  <p className="text-xs text-gray-500 truncate mt-0.5">youtu.be/{video.videoId}</p>
                </div>
                <button
                  onClick={(e) => removeVideo(video.id, e)}
                  className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
