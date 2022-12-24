import {Tracker} from './weaponTrackers.js'
import { world, Player} from "@minecraft/server"

//Example
world.events.entityHit.subscribe(data => {
    //Assigns the tracker if they dont have it
    if (Tracker.fetch(`hits`).isAssigned(data.entity) === false) Tracker.fetch(`hits`).assign(data.entity)

    //Adds to tracker (know that it only adds if the tracker IS assigned)
    Tracker.fetch(`hits`).add(data.entity, 1)
})
