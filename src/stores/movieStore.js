import { writable } from 'svelte/store';
import { API } from '../config';

export let popularPage = writable(1),
nowPlayingPage = writable(1),
nowPlayingMovies = writable([]),
genrePage = writable(1),
genreIDStore = writable(),
popularMovies = writable([]),
upcomingMovies = writable([]),
upcomingPage = writable(1),
isLoading = writable(false);

const getPopularMovies = async () => {
    isLoading.set(true);
    const response = await fetch(
        `${API.URL}/movie/popular?api_key=${API.KEY}&language=en-US&page=1`
    );
    const movies = await response.json();
    popularMovies.set([...movies.results]);
    isLoading.set(false);
}

const getNowPlayingMovies = async () => {
    isLoading.set(true);
    const response = await fetch(`${API.URL}/movie/now_playing?api_key=${API.KEY}&language=en-US&page=1`);
    const movies = await response.json();
    nowPlayingMovies.set([...movies.results]);
    isLoading.set(false);
}

const getUpcomingMovies = async () => {
    isLoading.set(true);
    const response = await fetch(`${API.URL}/movie/upcoming?api_key=${API.KEY}&language=en-US&page=1`);
    const movies = await response.json();
    upcomingMovies.set([...movies.results]);
    isLoading.set(false);
}

getNowPlayingMovies();
getPopularMovies();
getUpcomingMovies();