<script context="module">
	import { API } from '../../config';

	export async function load({ params }) {
		let keyword = params.keyword;
		const response = await fetch(
			`${API.URL}/search/movie?api_key=${API.KEY}&language=en-US&query=${keyword}&page=1`
		);
		const movies = await response.json();

		return { props: { keyword, movies: movies.results } };
	}
</script>

<script>
	import Container from '../../components/Container.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import MovieCard from '../../components/MovieCard.svelte';
	import Section from '../../components/Section.svelte';

	export let keyword, movies;
</script>

<MetaTags title="Search: {keyword} | Theatro" />

<Section>
	<Container>
		<h1 class="text-3xl font-bold mb-5 capitalize">Search: {keyword}</h1>
		<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5 mb-8">
			{#each movies as movie}
				<MovieCard {movie} />
			{/each}
		</div>
	</Container>
</Section>
