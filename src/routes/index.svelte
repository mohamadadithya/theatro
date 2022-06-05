<script context="module">
	import { API } from '../config';
	export async function load() {
		const [nowPlaying, popular, genres] = await Promise.all([
			fetch(`${API.URL}/movie/now_playing?api_key=${API.KEY}&language=en-US&page=1`).then((res) =>
				res.json()
			),
			fetch(`${API.URL}/movie/popular?api_key=${API.KEY}&language=en-US&page=1`).then((res) =>
				res.json()
			),
			fetch(`${API.URL}/genre/movie/list?api_key=${API.KEY}&language=en-US`).then((res) =>
				res.json()
			)
		]);

		return {
			props: {
				nowPlayingMovies: nowPlaying.results,
				popularMovies: popular.results,
				movieGenres: genres.genres
			}
		};
	}
</script>

<script>
	import Jumbotron from '../components/Jumbotron.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import Container from '../components/Container.svelte';
	import MovieCard from '../components/MovieCard.svelte';
	import Footer from '../components/Footer.svelte';
	import GenreButton from '../components/GenreButton.svelte';
	import Section from '../components/Section.svelte';

	export let nowPlayingMovies, popularMovies, movieGenres;
</script>

<MetaTags
	title="Theatro"
	description="Theatro is a non-profit website to show information about movies."
/>

<Section>
	<Container>
		<div class="mb-5">
			<Jumbotron title="Now Playing" background="/images/now-playing.jpg" />
			<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5 mb-8">
				{#each nowPlayingMovies.slice(0, 8) as movie}
					<MovieCard {movie} />
				{/each}
			</div>
			<a href="/movies/now-playing" class="bg-gray-800 p-3 rounded-md inline-block"
				>View All <i class="far fa-fw fa-arrow-right ml-1" /></a
			>
		</div>
		<div class="pb-10">
			<Jumbotron title="Popular" background="/images/popular.jpg" />
			<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5 mb-8">
				{#each popularMovies.slice(0, 8) as movie}
					<MovieCard {movie} />
				{/each}
			</div>
			<a href="/movies/popular" class="bg-gray-800 p-3 rounded-md inline-block"
				>View All <i class="far fa-fw fa-arrow-right ml-1" /></a
			>
		</div>
		<div class="pb-10">
			<h1 class="text-3xl uppercase font-bold mb-5">Available Genres</h1>
			<ul class="flex items-center flex-wrap">
				{#each movieGenres as genre}
					<li class="mb-2 mr-2">
						<GenreButton id={genre.id} name={genre.name} />
					</li>
				{/each}
			</ul>
		</div>
	</Container>
</Section>
<Footer />
