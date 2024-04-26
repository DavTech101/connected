<template>
  <div class="flex flex-col gap-2">
    <h1 class="font-medium">Node Clicked Info</h1>
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

const { node } = defineProps<{
  node: TTreeNodeWithChildren | undefined;
}>();
</script>
