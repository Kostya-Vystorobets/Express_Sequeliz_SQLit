import { Sequelize } from 'sequelize';
import { registerModels } from '../models';

export default class Database {
    constructor(environment, dbConfig) {
        this.dbConfig = dbConfig;
        this.environment = environment;
    }

    async connect() {

        const { storage, dialect } = this.dbConfig[this.environment];
        this.connection = new Sequelize({
            dialect,
            storage,
            logging: console.log,
        });

        await this.connection.authenticate();

        console.log('Connection to the database has been established successfully');

        registerModels(this.connection);

        await this.sync();
    }

    async disconnect() {
        await this.connection.close();
    }

    async sync() {
        await this.connection.sync({
            logging: false,
            force: false,
        });

        console.log('Connection synced successfully');
    }
}