import dotenv from 'dotenv';
import neo4j from 'neo4j-driver';

dotenv.config();
//##########################################################################################
// CONNECT TO NEO4J DATABASE
//##########################################################################################
export const db = () => {
  try {
    const driver = neo4j.driver(
      process.env.NEO4J_URI || 'bolt://localhost:7687',
      neo4j.auth.basic(
        process.env.NEO4J_USER || '',
        process.env.NEO4J_PASSWORD || ''
      )
    );

    return { driver, session: driver.session({ database: 'neo4j' }) };
  } catch (error) {
    console.error('Error connecting to the database: ', error);
    throw new Error('Error connecting to the database');
  }
};

export default db;
