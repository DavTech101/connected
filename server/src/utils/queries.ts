import { TTreeNode } from '../types';

//##########################################################################################
// FETCH ALL NODES QUERY
//##########################################################################################
export const fetchAllNodesQuery = `
    MATCH (n)
    RETURN n
`;

//##########################################################################################
// DELETE ALL DATA QUERY
//##########################################################################################
export const deleteAllDataQuery = `
    MATCH (n)
    DETACH DELETE n
`;

//##########################################################################################
// CREATE NODE CREATION QUERY
//##########################################################################################
export const createNodeQuery = (node: TTreeNode) => {
  return `
    CREATE (n:Node {
        name: '${node.name}',
        description: '${node.description}',
        parent: '${node.parent}'
    })
`;
};

//##########################################################################################
// CREATE CONNECT NODES QUERY
//##########################################################################################
export const createConnectNodesQuery = (node: TTreeNode) => {
  return `
        MATCH (c:Node {
            name: '${node.name}'}), 
            (p:Node {name: '${node.parent}'})
        CREATE (c)-[:PARENT]->(p)
    `;
};
