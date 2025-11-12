<script lang="ts">
    import { fade, crossfade } from "svelte/transition";
    import AuthModal from "$lib/components/AuthModal.svelte";

    let showAuthModal: boolean = $state(false)
    let authMode: 'login' | 'signup' = $state('login')

    let scrollY: number = $state(typeof window !== 'undefined' ? window.scrollY : 0);

    const [send, receive] = crossfade({
        duration: 400,
        fallback: (node) => fade(node, { duration: 400 })
    });

    let hoveredCategory: number | null = $state(null);

    function handleScroll(event: Event) {
        scrollY = window.scrollY;
    }

    let opacity: number = $derived(1 - Math.min(1, scrollY / 400));
    let translateY: number = $derived(scrollY * -0.2);
    let arrowOpacity: number = $derived(1 - Math.min(1, scrollY / 100));

    interface Category {
        id: number;
        name: string;
        iconUrl : string;
        splashUrl: string;
        route: string;
    }

    const categories: Category[] = [
        {
            id: 0,
            name: 'Resume',
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/5404/5404040.png',
            splashUrl: 'https://gratisography.com/wp-content/uploads/2018/05/gratisography-442H-5000-free-stock-photo.jpg',
            route: "/resume"
        },
        {
            id: 1,
            name: 'Dungeons & Dragons',
            iconUrl: 'https://www.pngmart.com/files/23/Dungeons-And-Dragons-Logo-PNG-Image.png',
            splashUrl: 'https://i.redd.it/27i6xhyyrnwe1.jpeg',
            route: "/dnd"
        },
        { 
            id: 2,
            name: 'ArmA 3',
            iconUrl: 'https://pngimg.com/d/arma_PNG56.png',
            splashUrl: 'https://images5.alphacoders.com/746/746133.jpg',
            route: "/arma"
        },
    ];

    let activeSplashUrl: string | null = $state(null);

    function handleCategoryHover(event: Event, category: Category | null) {
        if (category) {
            hoveredCategory = category.id;
            activeSplashUrl = category.splashUrl;
        } else {
            hoveredCategory = null;
            activeSplashUrl = null;
        }
    }
</script>

<svelte:window on:scroll={handleScroll}/>

<div class="relative min-h-[160vh] bg-white text-gray-900 font-inter">
    <button onclick={() => (showAuthModal = true)}>
        CLICK ME
    </button>
    <!--
        PARALLAX TITLE
    -->
    <div 
        class="fixed inset-0 flex items-center justify-center 
               pointer-events-none"
        style:opacity={opacity}
        style:transform={`translateY(${translateY}px)`}
    >
        <h1 
            class="text-8xl md:text-9xl lg:text-[10rem] 
                   font-extrabold tracking-tight 
                   text-gray-900/90 
                   transform transition-all duration-1000 ease-out 
                   opacity-0 animate-fade-in font-grenze"
        >
            Scotty's Compendium
        </h1>
    </div>

    <!--
        SPLASH BACKGROUND
    -->
    {#each [activeSplashUrl].filter(Boolean) as url (url)}
        <div 
            class="fixed inset-0 pointer-events-none"
            style:background-image={`url(${url})`}
            style:background-size="cover"
            style:background-position="center"
            style:filter="grayscale(20%)"
            style:opacity="0.4"
            in:receive={{ key: url }}
            out:send={{ key: url }}
        ></div>
    {/each}


    <!--
        SCROLL HINT ARROW
    -->
    <div 
        class="fixed bottom-10 left-1/2 -translate-x-1/2 
               transition-opacity duration-300 pointer-events-none z-50"
        style:opacity={arrowOpacity}
    >
        <!-- SVG for Down Arrow (using Lucide 'ChevronsDown' path) -->
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
            class="text-gray-900/70 bounce-arrow"
        >
            <path d="m7 15 5 5 5-5"/>
            <path d="m7 9 5 5 5-5"/>
        </svg>
    </div>

    <!--
        REVEAL CONTENT
    -->
    <main class="pt-[100vh] pb-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div class="flex justify-center">
                <div class="flex gap-8 justify-between max-w-6xl w-full flex-wrap">
                    {#each categories as category (category.name)}
                        {@const isHovered = hoveredCategory === category.id}
                        <a href={category.route} class="block">
                            <div 
                                class="flex flex-col items-center transition-transform duration-300 transform cursor-pointer"
                                onmouseenter={(e) => handleCategoryHover(e, category)}
                                onmouseleave={(e) => handleCategoryHover(e, null)}
                                role="button"
                                tabindex=0
                            >
                                <img 
                                    src={category.iconUrl} 
                                    alt={category.name} 
                                    class="w-48 h-48 object-contain rounded-xl transition-all duration-300
                                        {isHovered 
                                            ? 'scale-125 z-20' // If hovered: grow large, lift z-index
                                            : (hoveredCategory ? 'scale-90' : 'scale-100') // If NOT hovered, but something IS hovered: shrink slightly
                                        }"
                                />
                            </div>
                        </a>
                    {/each}
                </div>
            </div>
        </div>
    </main>
</div>

<AuthModal bind:open={showAuthModal} bind:mode={authMode}/>

<style>
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fade-in {
        animation: fadeIn 1.5s ease-out 0.5s forwards; /* 1.5s duration, 0.5s delay */
    }

    @keyframes bounce {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px); /* Move 10px up */
        }
    }

    .bounce-arrow {
        animation: bounce 1.5s infinite; /* Loop the animation infinitely */
    }
</style>