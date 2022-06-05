<script context="module">
	import { API } from '../../../config';
	import { genrePage, genreIDStore } from '../../../stores/movieStore';

	export async function load({ params }) {
		let genreID = params.id;
		let genreName = params.name;
		let page = params.page;

		try {
			const response = await fetch(
				`${API.URL}/discover/movie?api_key=${API.KEY}&with_genres=${genreID}&page=${page}`
			);
			const movies = await response.json();
			return { props: { movies: movies.results, genreName, genreID } };
		} catch (error) {
			console.log(error.message);
		}
	}
</script>

<script>
	import MovieCard from '../../../components/MovieCard.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import Container from '../../../components/Container.svelte';
	import { goto } from '$app/navigation';
	import LoadMoreButton from '../../../components/LoadMoreButton.svelte';
	import Section from '../../../components/Section.svelte';

	export let movies, genreName, genreID;

	$: if ($genreIDStore != genreID) {
		genrePage.set(1);
	}

	const paginate = (state) => {
		genreIDStore.set(genreID);
		if (state === 'next') {
			genrePage.update((currentPage) => (currentPage += 1));
		} else {
			genrePage.update((currentPage) =>
				currentPage <= 1 ? (currentPage = 1) : (currentPage -= 1)
			);
		}
		goto(`/movies/genres/${genreID}-${genreName}&page=${$genrePage}`);
	};
</script>

<MetaTags title="{genreName.replace(/^\w/, (c) => c.toUpperCase())} Movies | Theatro" />

<Section>
	<Container>
		<h1 class="text-3xl font-bold mb-5 capitalize">{genreName} Movies</h1>
		<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5 mb-8">
			{#each movies as movie}
				<MovieCard {movie} />
			{/each}
		</div>
		{#if $genrePage > 1}
			<LoadMoreButton
				on:click={() => paginate('previous')}
				icon="arrow-left"
				text="Previous Page"
			/>
		{/if}
		<LoadMoreButton on:click={() => paginate('next')} icon="arrow-right" text="Next Page" />
	</Container>
</Section>
