<script lang="ts">
  import Modal from '$lib/components/Modal.svelte';

  export let open = false;
  export let mode: 'login' | 'signup' = 'login';

  function close() {
    open = false;
  }

  function toggleMode() {
    mode = mode === 'login' ? 'signup' : 'login';
  }

  function handleSubmit(event: Event) {
    event.preventDefault();
    // TODO: Replace with real auth logic
    console.log(`${mode} form submitted`);
    close();
  }
</script>

<Modal bind:open title={mode === 'login' ? 'Log In' : 'Sign Up'} on:close={close}>
  <form onsubmit={handleSubmit} class="space-y-4">
    {#if mode === 'signup'}
      <div>
        <label class="block text-sm font-medium text-gray-700">Name</label>
        <input
            type="text"
            class="w-full mt-1 p-2 border rounded"
            required
        />
      </div>
    {/if}

    <div>
      <label class="block text-sm font-medium text-gray-700">Email</label>
      <input
        type="email"
        class="w-full mt-1 p-2 border rounded"
        required
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Password</label>
      <input
        type="password"
        class="w-full mt-1 p-2 border rounded"
        required
      />
    </div>

    <button
      type="submit"
      class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
    >
      {mode === 'login' ? 'Log In' : 'Sign Up'}
    </button>
  </form>

  <div class="text-sm text-center mt-4 text-gray-600">
    {#if mode === 'login'}
      Don't have an account?
      <button class="text-blue-600 hover:underline" onclick={toggleMode}>Sign up</button>
    {:else}
      Already have an account?
      <button class="text-blue-600 hover:underline" onclick={toggleMode}>Log in</button>
    {/if}
  </div>
</Modal>
