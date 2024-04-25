import db from './db';
import {
  createNodeQuery,
  deleteAllDataQuery,
  createConnectNodesQuery,
} from './queries';
import { sleep } from './misc';
import treeData from '../../data/treeData';
import type { Session } from 'neo4j-driver';

//##########################################################################################
// DELETE DATA FROM DATABASE
//##########################################################################################
const deleteData = async (session: Session) => {
  try {
    await session.run(deleteAllDataQuery);
    console.log('All Data Deleted successfully!');
  } catch (error) {
    throw new Error('Error deleting data');
  }
};

//##########################################################################################
// INSERT TREE DATA INTO DATABASE
//##########################################################################################
const insertTreeData = async (session: Session) => {
  try {
    for (const node of treeData.data) {
      const query = createNodeQuery(node);
      console.log(`Inserting Data: ${node.name}`);
      await session.run(query);
    }

    console.log('All Data Added successfully!');
  } catch (error) {
    throw new Error('Error inserting data');
  }
};

//##########################################################################################
// CONNECT TREE NODES IN DATABASE
//##########################################################################################
const connectTreeNodes = async (session: Session) => {
  const childNodes = treeData.data.filter((node) => node.parent !== '');

  try {
    for (const node of childNodes) {
      const query = createConnectNodesQuery(node);
      console.log(`Connecting Nodes: ${node.name} to ${node.parent}`);
      await session.run(query);
    }

    console.log('All Nodes Connected successfully!');
  } catch (error) {
    throw new Error('Error connecting nodes');
  }
};

//##########################################################################################
// POPULATE DATABASE WITH TREE DATA
//##########################################################################################
export const populateDb = async () => {
  const { driver, session } = db();

  try {
    await deleteData(session);
    await sleep(5000);
    await insertTreeData(session);
    await sleep(5000);
    await connectTreeNodes(session);

    console.log('Database populated successfully!');
  } catch (error) {
    console.error('Error populating the database: ', error);
  } finally {
    session.close();
    driver.close();
  }
};

populateDb();
