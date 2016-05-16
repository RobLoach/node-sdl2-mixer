var sdl = require('node-sdl2')
var mix = require('..')

//First we need to start up SDL, and make sure it went ok
if (sdl.SDL_Init(sdl.SDL_INIT_VIDEO) != 0){
	console.log("SDL_Init Error: " + sdl.SDL_GetError())
	process.exit(1)
}

//Now create a window with title "Hello World" at 100, 100 on the screen with w:640 h:480 and show it
var win = sdl.SDL_CreateWindow("Hello World!", 100, 100, 640, 480, sdl.SDL_WINDOW_SHOWN);
if (!win){
	console.log("SDL_CreateWindow Error: " + sdl.SDL_GetError())
	process.exit(1)
}

// Clear the window.
var renderer = sdl.SDL_CreateRenderer(win, -1, 0)
sdl.SDL_SetRenderDrawColor(renderer, 255, 255, 255, 255)
sdl.SDL_RenderClear(renderer);
sdl.SDL_RenderPresent(renderer)

// Initialize SDL_Mixer.
if (mix.Mix_OpenAudio(44100, mix.MIX_DEFAULT_FORMAT, 2, 2048) < 0) {
	console.log("Mix_OpenAudio Error: " + mix.Mix_GetError())
	process.exit(1);
}

// Load the Music.
var music = mix.Mix_LoadMUS('test/beat.wav')
if (!music) {
	console.log("Mix_LoadMUS Error: " + mix.Mix_GetError())
	process.exit(1);
}

// Play the music, indefinitely.
if (mix.Mix_PlayMusic(music, -1) !== 0) {
	console.log("Mix_PlayMusic Error: " + mix.Mix_GetError())
	process.exit(1);
}

// Take a quick break after all that hard work
sdl.SDL_Delay(3000)

// Clean up our objects and quit
mix.Mix_FreeMusic(music)
mix.Mix_Quit()
sdl.SDL_DestroyWindow(win)
sdl.SDL_Quit()
