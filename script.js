const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}


// Convert Text-to-speech
function textToSpeech(joke) {
    VoiceRSS.speech({
        key: '2573809f863541d79e021d1473f19fd9',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


// Passing Joke to VoiceRSS API
function tellMe(joke) {
    // console.log("tell me: ", joke);
    textToSpeech(joke);
}


// Get Jokes from Joke API
async function getJokes() {
    let = joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        /* Text-to-speech */
        tellMe(joke);
        /* Disable Button*/
        toggleButton();
    } catch(error) {
        // Catch Errors Here
        console.log('Whoops!\n  ', error);
    }
}


// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
