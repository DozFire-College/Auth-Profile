import Fastify from 'fastify';
import "dotenv/config";
import cors from '@fastify/cors'; //> cors для общения между серверами
import routes from "./routes/routes.js";

import { initDb} from "./database/database.js";

const port = process.env.PROFILE_PORT || 3001;

const fastify = Fastify({longer: false});

await initDb();

await fastify.register(routes);

await fastify.register(cors, {origin: [true]});

fastify.listen({port}, () => {console.log(`http://localhost:${port}`)});