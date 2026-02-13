onload = () => {
    const c = setTimeout(() => {
        document.body.classList.remove("not-loaded");
        clearTimeout(c);
    }, 1000);

    // Music Logic
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = musicToggle.querySelector('.music-icon');
    let musicPlaying = false;

    // Try to play music automatically
    bgMusic.volume = 0.5; // Set volume to 50%

    const playMusic = () => {
        bgMusic.play()
            .then(() => {
                musicPlaying = true;
                musicIcon.textContent = '🎵';
                musicToggle.classList.remove('muted');
            })
            .catch(err => {
                console.log("Autoplay prevented:", err);
                musicPlaying = false;
                musicIcon.textContent = '🔇';
                musicToggle.classList.add('muted');
            });
    };

    // Try to play on load
    playMusic();

    // Ensure play on first user interaction if autoplay failed
    document.body.addEventListener('click', () => {
        if (!musicPlaying) {
            playMusic();
        }
    }, { once: true });

    // Toggle button logic
    musicToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent body click from triggering
        if (musicPlaying) {
            bgMusic.pause();
            musicPlaying = false;
            musicIcon.textContent = '🔇';
            musicToggle.classList.add('muted');
        } else {
            bgMusic.play();
            musicPlaying = true;
            musicIcon.textContent = '🎵';
            musicToggle.classList.remove('muted');
        }
    });
};
