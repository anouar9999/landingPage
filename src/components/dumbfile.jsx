const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const audioElementRef = useRef(null);

   const toggleAudioIndicator = () => {
      setIsAudioPlaying((prev) => !prev);
      setIsIndicatorActive((prev) => !prev);
    };

      useEffect(() => {
        if (isAudioPlaying) {
          audioElementRef.current.play();
        } else {
          audioElementRef.current.pause();
        }
      }, [isAudioPlaying]);

      <button
      onClick={toggleAudioIndicator}
      className="flex items-center space-x-0.5"
    >
      <audio
        ref={audioElementRef}
        className="hidden"
        src="/audio/loop.mp3"
        loop
      />
      {[1, 2, 3, 4].map((bar) => (
        <div
          key={bar}
          className={clsx("indicator-line", {
            active: isIndicatorActive,
          })}
          style={{
            animationDelay: `${bar * 0.1}s`,
          }}
        />
      ))}
    </button>