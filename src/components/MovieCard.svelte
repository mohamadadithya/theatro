<script>
	import { API } from '../config';
	import moment from 'moment';

	export let movie;
</script>

<div>
	<a href="/movies/{movie.id}" class="flex flex-col">
		<img
			src={movie.poster_path ? `${API.IMAGE_URL}${movie.poster_path}` : '/images/poster.png'}
			class="w-full rounded-md mb-3 transition-all duration-300 hover:scale-105"
			alt={movie.title}
		/>
		<p class="font-bold whitespace-nowrap overflow-hidden text-ellipsis">{movie.title}</p>
	</a>
	<p class="text-xs mt-1.5 text-gray-500 uppercase">{movie.original_language}</p>
	<p class="text-xs mt-1 text-gray-500">
		{moment(movie.release_date).format('LL')}
	</p>
</div>
