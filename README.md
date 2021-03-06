# web_music_player

This runs using PHP and JavaScript to list and play MP3s.

## complicated explanation

The PHP delivers a JSON array when requested that contains file paths and metadata for every song.
JavaScript parses the JSON and converts it into clickable buttons that can play music when clicked

The music is stored in the IndexedDB using [LocalForage](https://localforage.github.io/localForage/).
When the song is first played it will be downloaded from the server, then encoded into Base64 and stored.
Upon being cached, the song will not be downloaded again, and will be served directly from the IndexedDB cache.
