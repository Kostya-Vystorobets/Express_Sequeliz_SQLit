import models from '../models';

const { Actor } = models;

const actorService = {
    async createActor(actorName) {
        return Actor.create({ name: actorName });
    },

    async getActorByName(actorName) {
        return Actor.findOne({ where: { name: actorName } });
    },
};

export default actorService;
