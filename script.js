// We wrap our entire code in this event listener to make sure the HTML is fully loaded before the script runs.
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SELECT ALL OUR HTML ELEMENTS ---
    // This is where we grab all the interactive elements from our HTML file.
    const allButtons = document.querySelectorAll('.btn');
    const stopBtn = document.getElementById('stop-all-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const searchBox = document.getElementById('search-box');
    const nowPlayingDisplay = document.getElementById('now-playing-display');


// --- 2. CREATE A MAP OF SOUNDS ---
// This is updated to match all the files in your screenshot.
     const sounds = {
         'malgudi': new Audio('assets/malgudi_days.mp3'),
         'mahabharat_sad': new Audio('assets/mahabharat_sad_song.mp3'), // Use your full filename here
         'byomkesh': new Audio('assets/byomkesh_bakshi.mp3'),
         'junglebook': new Audio('assets/jungle_jungle.mp3'),
         'shaktimaan_theme': new Audio('assets/shaktimaan.mp3'),
         'mogambo': new Audio('assets/mogambo_khush_hua.mp3'), // Use your full filename here
         'doordarshan': new Audio('assets/doordarshan.mp3')
    };


    // --- 3. CORE FUNCTIONS ---

    /**
     * Stops all currently playing sounds. This is a crucial function to prevent chaos!
     * It also resets the visual feedback on all buttons.
     */
    function stopAllSounds() {
        // We loop through every sound object in our `sounds` map.
        for (const soundKey in sounds) {
            const sound = sounds[soundKey];
            sound.pause();      // Stop the audio
            sound.currentTime = 0; // Rewind it to the beginning
        }
        // Remove the 'playing' class from any button that has it.
        allButtons.forEach(button => {
            button.classList.remove('playing');
        });
        // Reset the now playing display
        nowPlayingDisplay.textContent = '--';
    }


    // --- 4. EVENT LISTENERS ---

    // A) Add a click event to every single sound button
    allButtons.forEach(button => {
        button.addEventListener('click', () => {
            // First, stop any other sound that might be playing.
            stopAllSounds();

            // Get the unique sound key from the button's 'data-sound' attribute.
            const soundKey = button.dataset.sound;
            const soundToPlay = sounds[soundKey];

            if (soundToPlay) {
                // Play the sound!
                soundToPlay.play();
                
                // Update the 'Now Playing' display with the button's text.
                nowPlayingDisplay.textContent = button.textContent;
                
                // Add the 'playing' class for that cool visual effect from our CSS.
                button.classList.add('playing');

                // IMPORTANT: Listen for when this specific sound finishes playing.
                soundToPlay.addEventListener('ended', () => {
                    // When it ends, remove the visual effect and reset the display.
                    button.classList.remove('playing');
                    nowPlayingDisplay.textContent = '--';
                });
            }
        });
    });

    // B) Add a click event to our master "STOP ALL" button
    stopBtn.addEventListener('click', stopAllSounds);

    // C) Add an 'input' event to the volume slider
    volumeSlider.addEventListener('input', (event) => {
        // Get the slider's current value (from 0 to 1).
        const volumeLevel = event.target.value;
        // Loop through all our sounds and set their volume.
        for (const soundKey in sounds) {
            sounds[soundKey].volume = volumeLevel;
        }
    });

    // D) Add a 'keyup' event to the search box for real-time filtering
    searchBox.addEventListener('keyup', (event) => {
        const searchTerm = event.target.value.toLowerCase();

        allButtons.forEach(button => {
            const buttonText = button.textContent.toLowerCase();
            // If the button's text includes the search term, show it. Otherwise, hide it.
            if (buttonText.includes(searchTerm)) {
                button.style.display = 'block'; // Or 'flex', 'inline-block', etc.
            } else {
                button.style.display = 'none';
            }
        });
    });

});