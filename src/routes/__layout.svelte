<script>
	import Navbar from '../components/Navbar.svelte';
	import '../../static/css/tailwind.css';
</script>

<svelte:head>
	<link
		href="https://cdn.jsdelivr.net/gh/hung1001/font-awesome-pro@4cac1a6/css/all.css"
		rel="stylesheet"
		type="text/css"
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;700&family=Satisfy&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main class="bg-gray-900 text-white font-plus-jakarta-sans">
	<Navbar />
	<slot />
</main>
