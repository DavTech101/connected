<template>
  <header>
    <div class="py-10">
      <Suspense>
        <template #default>
          <div class="flex flex-col gap-10 justify-center items-center">
            <InfoBox :node="clickedNode" />
            <TreeNodes
              :nodes="treeData"
              v-if="treeData !== undefined"
              :handleNodeClick="handleNodeClick"
              @:handleNodeClick="handleNodeClick"
            />
            <p v-else>Loading tree data...</p>
          </div>
        </template>
        <template #fallback> </template>
      </Suspense>
    </div>
  </header>

  <main></main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchTreeData } from './server/tree';
import InfoBox from './components/InfoBox.vue';
import TreeNodes from './components/TreeNodes.vue';
import type { TTreeNode, TTreeNodeWithChildren } from '@Types/index';

const treeData = ref<TTreeNode[] | undefined>(undefined);
const clickedNode = ref<TTreeNodeWithChildren | undefined>(undefined);

onMounted(async () => {
  treeData.value = await fetchTreeData();
});

const handleNodeClick = (node: TTreeNodeWithChildren) => {
  if (clickedNode.value && clickedNode.value.name === node.name) {
    clickedNode.value = undefined;
    return;
  }

  clickedNode.value = node;
};
</script>
