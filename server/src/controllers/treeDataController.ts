import db from '../utils/db';
import { Request, Response } from 'express';
import { fetchAllNodesQuery } from '../utils/queries';

//##########################################################################################
// GET TREE DATA CONTROLLER
//##########################################################################################
export const getTreeDataController = async (req: Request, res: Response) => {
  try {
    const { driver, session } = db();
    const { records } = await session.run(fetchAllNodesQuery);

    const nodes = records.map((record) => {
      const node = record.get('n');

      return {
        id: node.elementId,
        name: node.properties.name,
        description: node.properties.description,
        parent: node.properties.parent,
      };
    });

    session.close();
    driver.close();
    res.status(200).send(JSON.stringify(nodes));
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }

    res.status(500).json({ message: 'Something went wrong' });
  }
};
