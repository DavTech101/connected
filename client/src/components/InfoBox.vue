<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-between">
      <h1 class="font-medium">Node Clicked Info</h1>
      <button
        class="bg-red-500 text-white p-2 w-[3rem] rounded-md"
        @click="crossClickedNode"
      >
        X
      </button>
    </div>
    <div
      class="flex flex-col justify-start border-4 p-4 border-emerald-700 min-w-[25rem]"
    >
      <div>
        <p>
          <span class="font-medium">Name: </span
          ><span v-if="node">{{ node.name }}</span>
        </p>
        <p>
          <span class="font-medium">Description: </span>
          <span v-if="node">{{ node.description }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TTreeNodeWithChildren } from '@Types/index';

const { node, crossClickedNode } = defineProps<{
  node: TTreeNodeWithChildren | undefined;
  crossClickedNode: () => void;
}>();
</script>
