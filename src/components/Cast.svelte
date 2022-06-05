<script>
	import { API } from '../config';

	export let cast;
</script>

<div class="text-center">
	<img
		class="aspect-square rounded-full object-cover mb-3"
		src={cast.profile_path ? `${API.IMAGE_URL}${cast.profile_path}` : '/images/avatar.webp'}
		alt={cast.name}
	/>
	<p class="whitespace-nowrap overflow-hidden text-ellipsis">{cast.name}</p>
	<p class="text-xs text-gray-500">{cast.character}</p>
</div>
