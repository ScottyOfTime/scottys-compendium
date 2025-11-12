<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  export let open = false;            // Whether modal is visible
  export let title: string | null = null; // Optional title
  export let closeOnBackdrop = true;  // Close when clicking backdrop

  const dispatch = createEventDispatcher();

  function close() {
    dispatch('close');
  }

  function handleBackdropClick(event: MouseEvent) {
    if (closeOnBackdrop && event.target === event.currentTarget) {
      close();
    }
  }

  // Close on Escape key
  onMount(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) close();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });
</script>

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    onclick={handleBackdropClick}
    role="dialog"
    aria-modal="true"
    tabindex="0"
  >
    <div
      class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative animate-fadeIn"
    >
      <button
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-900"
        onclick={close}
        aria-label="Close modal"
      >
        ✕
      </button>

      {#if title}
        <h2 class="text-lg font-semibold mb-4 text-gray-900">
          {title}
        </h2>
      {/if}

      <slot />
    </div>
</div>
{/if}

<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out;
  }
</style>
