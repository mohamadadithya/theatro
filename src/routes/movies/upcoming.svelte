<script>
	import { isLoading, upcomingMovies, upcomingPage } from '../../stores/movieStore';
	import Container from '../../components/Container.svelte';
	import MovieCard from '../../components/MovieCard.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import LoadMoreButton from '../../components/LoadMoreButton.svelte';
	import { API } from '../../config';
	import Section from '../../components/Section.svelte';

	const loadMore = async () => {
		upcomingPage.update((currentPage) => (currentPage += 1));
		isLoading.set(true);
		const response = await fetch(
			`${API.URL}/movie/upcoming?api_key=${API.KEY}&language=en-US&page=${$upcomingPage}`
		);
		const movies = await response.json();
		upcomingMovies.update((currentMovies) => {
			currentMovies = [...currentMovies, ...movies.results];
			return currentMovies;
		});
		isLoading.set(false);
	};
</script>

<MetaTags title="Upcoming Movies | Theatro" />

<Section>
	<Container>
		<h1 class="text-3xl font-bold mb-5">Upcoming Movies</h1>
		<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5 mb-8">
			{#each $upcomingMovies as movie}
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
