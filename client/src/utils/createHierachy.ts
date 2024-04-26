import type { TTreeNodeWithChildren } from '@Types/index';

type TMap = { [key: string]: TTreeNodeWithChildren };

//##########################################################################################
// CREATE HIERACHY AND RETURN ROOT NODE
//##########################################################################################
const createHierachy = (
  data: TTreeNodeWithChildren[] | undefined
): TTreeNodeWithChildren => {
  if (!data) return { name: '', parent: '', description: '' };

  const dataMap: TMap = data.reduce((map: TMap, node) => {
    map[node.name] = { ...node, children: [] };
    return map;
  }, {});

  const treeData: TTreeNodeWithChildren[] = [];
  data.forEach((node) => {
    if (node.parent) {
      dataMap[node.parent].children?.push(dataMap[node.name]);
    } else {
      treeData.push(dataMap[node.name]);
    }
  });

  return treeData[0];
};

export default createHierachy;
