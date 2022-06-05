<script>
	export let id, name;
</script>

<a
	href="/movies/genres/{id}-{name.toLowerCase()}&page=1"
	class="border border-gray-800 py-2 px-5 inline-block rounded-full">{name}</a
>
