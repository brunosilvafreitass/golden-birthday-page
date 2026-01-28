import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Using a royalty-free funk/party music
  const musicUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.loop = true;
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={musicUrl} />
      <button
        onClick={togglePlay}
        className={`music-btn ${isPlaying ? 'playing' : ''}`}
        aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
      >
        {isPlaying ? (
          <Pause className="w-7 h-7 text-primary-foreground" />
        ) : (
          <Play className="w-7 h-7 text-primary-foreground ml-1" />
        )}
      </button>
      {isPlaying && (
        <div className="fixed bottom-6 right-24 z-50 flex items-center gap-2 text-primary text-sm">
          <Volume2 className="w-4 h-4 animate-pulse" />
          <span className="font-body">Tocando...</span>
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
