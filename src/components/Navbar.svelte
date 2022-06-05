<script>
	import { goto } from '$app/navigation';

	import Container from './Container.svelte';

	let isOpen = false,
		searchOpen = false,
		keyword;

	const searchMovies = () => {
		if (keyword) {
			goto(`/movies/search=${keyword}`);
		}
	};
</script>

<nav class="py-4 bg-gray-800 text-white fixed w-full shadow-lg z-10">
	<Container classes="md:flex justify-between items-center">
		<div class="flex justify-between items-center">
			<a href="/" class="font-bold text-3xl font-satisfy">Theatro</a>
			<button class="text-2xl md:hidden" on:click={() => (isOpen = !isOpen)}>
				<i class="far fa-fw fa-{isOpen ? 'times' : 'bars'}" />
			</button>
		</div>
		<ul class="{isOpen ? 'block' : 'hidden'} md:flex mt-4 md:mt-0">
			<li class="md:mr-6 py-4 md:py-0 border-b md:border-0 border-white">
				<a href="/movies/now-playing">Now Playing</a>
			</li>
			<li class="md:mr-6 py-4 md:py-0 border-b md:border-0 border-white">
				<a href="/movies/popular">Popular</a>
			</li>
			<li class="md:mr-6 py-4 md:py-0 border-b md:border-0 border-white">
				<a href="/movies/upcoming">Upcoming</a>
			</li>
			<li class="py-6 md:py-0">
				<form class="flex items-center" on:submit|preventDefault={searchMovies}>
					<button type="button" on:click={() => (searchOpen = !searchOpen)}>
						<i class="far fa-fw fa-search" />
					</button>
					<input
						type="text"
						class="{searchOpen
							? 'block'
							: 'hidden'} w-full ml-3 outline-none bg-transparent border-b border-white"
						name="keyword"
						id="keyword"
						placeholder="Enter a movie title"
						autocomplete="off"
						bind:value={keyword}
					/>
				</form>
			</li>
		</ul>
	</Container>
</nav>
