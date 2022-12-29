import {
    Location,
    world,
    Player,
    Vector} from '@minecraft/server';


function random(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * spawns a indicator 
 * @param {Player} player 
 * @param {String} text 
 * @param {Array} vector 
 */
export async function indicator(player, text, vector=[0, 0.1,0], offset=[random(-1, 1), -0.5, random(-1, 1)]) {
    const {x, y,z} = player.location
    const h = world.getDimension(`overworld`).spawnEntity('is:hollagram', new Location(x + offset[0], y + offset[1], z + offset[2]))
    h.nameTag = text
    h.setVelocity(new Vector(vector[0], vector[1], vector[2]))
}

//Example
world.events.entityHurt.subscribe(async (data) => {
    indicator(data.hurtEntity, `§c§l${data.damage}`, [0, -0.1, 0], [random(-1, 1), 0.5, random(-1, 1)])
})