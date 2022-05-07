import {config} from "dotenv";
const neo4j = require('neo4j-driver')

const driver = neo4j.driver("127.0.0.1", neo4j.auth.basic(process.env.DB_NEO4J_USER, process.env.DB_NEO4J_PASSWORD))
const session = driver.session()


export async function requestToDB(personName: String) {

    try {
        const result = await session.run(
            'CREATE (a:Person {name: $name}) RETURN a',
            {name: personName}
        )

        const singleRecord = result.records[0]
        const node = singleRecord.get(0)

        console.log(node.properties.name)
    } finally {
        await session.close()
    }

// on application exit:
    await driver.close()
}
