<script>
    import { Github, User } from "@lucide/svelte";

    let showModal = $state(false);
</script>

<header class="bg-white sticky top-0 z-50 shadow-md flex justify-between items-center font-grenze text-xl">
    <a href="/" class="flex justify-start pl-4 cursor-pointer">
        Scotty's Compendium
    </a>
    <div class="flex justify-end pr-4 pt-2 pb-2 space-x-2">
        <a href="https://github.com/ScottyOfTime/scottys-compendium" target="_blank">
            <Github color="#101828" size=28/>
        </a>
        <button onclick={() => (showModal = true)}>
            <User color="#101828" size=28/>
        </button>
    </div>
</header>