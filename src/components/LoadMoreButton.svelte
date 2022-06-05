<script>
	export let text = 'Load More',
		icon = 'sync';
</script>

<button on:click class="bg-gray-800 p-3 rounded-md"
	>{text} <i class="far fa-fw fa-{icon} ml-2" /></button
>
