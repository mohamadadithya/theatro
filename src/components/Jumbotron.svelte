<script>
	export let title, background;
</script>

<div
	style="background-image: url({background});"
	class="md:h-96 h-64 bg-cover rounded-xl bg-center flex justify-center items-center mb-8"
>
	<h1 class="text-3xl md:text-4xl font-bold tracking-widest uppercase">{title}</h1>
</div>
