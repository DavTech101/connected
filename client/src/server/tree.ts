import axios from 'axios';
import type { TTreeNode } from '@Types/index';
import { TREE_DATA_URL } from '../data/constants';

//##########################################################################################
// FETCH TREE DATA
//##########################################################################################
export const fetchTreeData = async () => {
  try {
    const response = await axios.get<TTreeNode[]>(TREE_DATA_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching tree data: fetchTreeData() ');
  }
};
