//##########################################################################################
// TREE NODE TYPE
//##########################################################################################
export type TTreeNode = {
  id: string;
  name: string;
  parent: string;
  description: string;
};

//##########################################################################################
// TREE NODE TYPE WITH CHILDREN
//##########################################################################################
export type TTreeNodeWithChildren = {
  name: string;
  parent: string;
  description: string;
  children?: TTreeNodeWithChildren[];
};

//##########################################################################################
// LINK TYPE
//##########################################################################################
export type TLink = {
  x: number;
  y: number;
};
