<script context="module">
	import { API } from '../../config';

	export async function load({ params }) {
		let movieID = params.id;
		const [movie, trailer, casts, similar] = await Promise.all([
			fetch(`${API.URL}/movie/${movieID}?api_key=${API.KEY}&language=en-US`).then((res) =>
				res.json()
			),
			fetch(`${API.URL}/movie/${movieID}/videos?api_key=${API.KEY}&language=en-US`).then((res) =>
				res.json()
			),
			fetch(`${API.URL}/movie/${movieID}/credits?api_key=${API.KEY}&language=en-US`).then((res) =>
				res.json()
			),
			fetch(`${API.URL}/movie/${movieID}/similar?api_key=${API.KEY}&language=en-US&page=1`).then(
				(res) => res.json()
			)
		]);

		return {
			props: { movie, trailer, casts: casts.cast, similarMovies: similar.results }
		};
	}
</script>

<script>
	import { MetaTags } from 'svelte-meta-tags';
	import Container from '../../components/Container.svelte';
	import moment from 'moment';
	import GenreButton from '../../components/GenreButton.svelte';
	import Cast from '../../components/Cast.svelte';
	import MovieCard from '../../components/MovieCard.svelte';
	import Section from '../../components/Section.svelte';

	export let movie, trailer, casts, similarMovies;
</script>

<MetaTags title="{movie.title} | Theatro" />

<Section>
	<Container classes="lg:grid grid-cols-[30%_70%] md:gap-6 lg:gap-0">
		<img
			class="w-2/4 md:w-80 md:h-auto object-cover rounded-lg mx-auto lg:mx-0 mb-6"
			src={movie.poster_path ? `${API.IMAGE_URL}${movie.poster_path}` : '/images/poster.png'}
			alt={movie.title}
		/>
		<div>
			<div class="lg:text-left text-center border-b-2 border-gray-800 border-dashed pb-6 mb-6">
				<h1 class="text-3xl font-bold mb-2">{movie.title}</h1>
				<p class="text-gray-500 italic mb-5">{movie.tagline}</p>
				<p class="mb-5">
					{moment(movie.release_date).format('Y')}
					<span class="ml-4 uppercase">{movie.original_language}</span>
					<span class="ml-4">{movie.runtime} minutes</span>
				</p>
				<p class="mb-6 font-bold">
					Rating: <span class="bg-yellow-500 ml-2 text-black p-1 rounded-md"
						>{movie.vote_average}</span
					>
				</p>
				<ul class="flex md:justify-start justify-center items-center flex-wrap">
					{#each movie.genres as genre}
						<li class="mb-2 mr-2">
							<GenreButton id={genre.id} name={genre.name} />
						</li>
					{/each}
				</ul>
			</div>
			<div class="grid lg:grid-cols-2 gap-6 border-b-2 border-gray-800 border-dashed pb-5">
				<div class="order-2 md:order-1">
					<h2 class="text-xl font-bold mb-3">Plot</h2>
					<p class="text-gray-500">{movie.overview}</p>
				</div>
				<div class="order-1 md:order-2">
					<h2 class="text-xl font-bold mb-3">Trailer</h2>
					{#if trailer.results.length > 0}
						<iframe
							class="w-full h-60 md:h-80 rounded-md"
							src="https://www.youtube.com/embed/{trailer.results[0].key}"
							title="YouTube video player"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
						/>
					{:else}
						<p>Trailer's not available.</p>
					{/if}
				</div>
			</div>
			<h2 class="mt-4 font-bold text-xl mb-5">Cast</h2>
			<div class="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5 overflow-y-scroll max-h-64">
				{#each casts as cast}
					<Cast {cast} />
				{/each}
			</div>
			<h2 class="mt-8 mb-5 font-bold text-xl border-t-2 border-gray-800 border-dashed pt-5">
				Similar Movies
			</h2>
			<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mb-8">
				{#each similarMovies as movie}
					<MovieCard {movie} />
				{/each}
			</div>
		</div>
	</Container>
</Section>
