//##########################################################################################
// TREE NODE TYPE
//##########################################################################################
export type TTreeNode = {
  name: string;
  parent: string;
  description: string;
};

//##########################################################################################
// TREE DATA TYPE
//##########################################################################################
export type TTreeData = {
  data: TTreeNode[];
};
