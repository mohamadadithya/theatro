<script>
	import { API } from '../../config';
	import { isLoading, popularMovies, popularPage } from '../../stores/movieStore';
	import MovieCard from '../../components/MovieCard.svelte';
	import Container from '../../components/Container.svelte';
	import LoadMoreButton from '../../components/LoadMoreButton.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import Section from '../../components/Section.svelte';

	const loadMore = async () => {
		popularPage.update((currentPage) => (currentPage += 1));
		isLoading.set(true);
		const response = await fetch(
			`${API.URL}/movie/popular?api_key=${API.KEY}&language=en-US&page=${$popularPage}`
		);
		const movies = await response.json();
		popularMovies.update((currentMovies) => {
			currentMovies = [...currentMovies, ...movies.results];
			return currentMovies;
		});
		isLoading.set(false);
	};
</script>

<MetaTags title="Popular | Theatro" />

<Section>
	<Container>
		<h1 class="text-3xl font-bold mb-5">Popular Movies</h1>
		<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5 mb-8">
			{#each $popularMovies as movie}
				<MovieCard {movie} />
			{/each}
		</div>
		{#if $isLoading}
			<i class="fas fa-fw text-4xl fa-spin fa-spinner" />
		{:else}
			<LoadMoreButton on:click={loadMore} />
		{/if}
	</Container>
</Section>
