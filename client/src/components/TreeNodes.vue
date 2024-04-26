<template>
  <div id="treeNodes" />
</template>

<script setup lang="ts">
import * as d3 from 'd3';
import { onMounted } from 'vue';
import createHierachy from '../utils/createHierachy';
import type { TTreeNode, TTreeNodeWithChildren } from '@Types/index';

const { nodes, handleNodeClick } = defineProps<{
  nodes: TTreeNode[] | undefined;
  handleNodeClick: (node: TTreeNodeWithChildren) => void;
}>();

onMounted(() => {
  if (!nodes) return;
  const rootNode = createHierachy(nodes);

  mountTree(rootNode);
});

//#######################################################
// MOUNT THE TREE
//#######################################################
const mountTree = (rootNode: TTreeNodeWithChildren) => {
  const width = 600;
  const height = 400;
  const margin = { top: 20, right: 120, bottom: 20, left: 120 };

  // MOUNT THE SVG ON #treeNodes
  const svg = d3
    .select('#treeNodes')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const tree = d3
    .tree<TTreeNodeWithChildren>()
    .size([
      height - margin.top - margin.bottom,
      width - margin.left - margin.right,
    ]);

  const root: d3.HierarchyNode<TTreeNodeWithChildren> = d3.hierarchy(
    rootNode,
    (d) => d.children
  );

  tree(root);

  const createLinks: any = d3
    .linkHorizontal()
    .x((d: any) => d.y)
    .y((d: any) => d.x);

  // Create the links
  const links = svg
    .selectAll('.link')
    .data(root.links())
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', createLinks)
    .attr('fill', 'none')
    .attr('stroke', '#ccc')
    .attr('stroke-width', '1px');

  // SHAPE AND CREATE THE SQUARE NODES
  const node = svg
    .selectAll('.node')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', (d) => `translate(${d.y},${d.x})`);

  node
    .append('rect')
    .attr('width', 60)
    .attr('height', 40)
    .attr('x', -30)
    .attr('y', -20)
    .attr('fill', 'white')
    .attr('stroke', 'green')
    .on(
      'click',
      function (event: MouseEvent, d: d3.HierarchyNode<TTreeNodeWithChildren>) {
        handleNodeClick(d.data);
      }
    );

  // LABELS INSIDE THE SQUARE NODES
  node
    .append('text')
    .attr('dy', '.35em')
    .attr('x', 0)
    .attr('y', 0)
    .style('text-anchor', 'middle') // Ensure the text-anchor is set to middle for horizontal centering
    .text((d) => d.data.name)
    .on(
      'click',
      function (event: MouseEvent, d: d3.HierarchyNode<TTreeNodeWithChildren>) {
        handleNodeClick(d.data);
      }
    );
};
</script>
