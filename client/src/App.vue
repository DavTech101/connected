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
import axios from 'axios';
import { ref, onMounted } from 'vue';
import InfoBox from './components/InfoBox.vue';
import { TREE_DATA_URL } from './data/constants';
import TreeNodes from './components/TreeNodes.vue';
import type { TTreeNode, TTreeNodeWithChildren } from '@Types/index';

const treeData = ref<TTreeNode[] | undefined>(undefined);
const clickedNode = ref<TTreeNodeWithChildren | undefined>(undefined);

const fetchTreeData = async () => {
  try {
    const response = await axios.get<TTreeNode[]>(TREE_DATA_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching tree data: fetchTreeData() ');
  }
};

onMounted(async () => {
  treeData.value = await fetchTreeData();
});

const handleNodeClick = (node: TTreeNodeWithChildren) => {
  console.log('node', node);

  console.log('clickedNode', clickedNode.value);
  console.log(node);

  if (clickedNode.value && clickedNode.value.name === node.name) {
    clickedNode.value = undefined;
    return;
  }

  clickedNode.value = node;
};
</script>
