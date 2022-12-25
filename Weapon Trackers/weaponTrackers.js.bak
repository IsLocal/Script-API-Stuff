import { world, Player } from "@minecraft/server"



/**
 * Track stats on a weapon
 * note i chose to use player as argument instead of ItemStack bc im dumb 
 */
export class Tracker {
    static trackers = []
    


    static fetch(id) {
        return Tracker.trackers.find(t => t.id === id)
    }

    constructor(defs) {
        this.id = defs.id
        this.format = defs.format
        this.regex = new RegExp(`${this.format.replace(`(value)`, `(\\d+)`)}`)


        //ik this is bad practice but whateva just make sure to be smart 
        //dont define trackers in functions without purging them at somepoint in the function!
        Tracker.trackers.push(this)
    }

    /**
     * Gets the value on a player's current weapon
     * @param {Player} player 
     * @returns Number
     */
    value(player) {
        const inv = player.getComponent(`minecraft:inventory`).container
        const item = inv.getItem(player.selectedSlot)
        let lore = item?.getLore() ?? []
        return lore.find(l => l.match(this.regex))?.match(this.regex)[1]
    }

    isAssigned(player) {
        const inv = player.getComponent(`minecraft:inventory`).container
        const item = inv.getItem(player.selectedSlot)
        let lore = item?.getLore() ?? []
        return lore.findIndex(l => l.match(this.regex)) == -1 ? false : true
    }

    /**
     * Removes a tracker from a weapon
     * @param player
     * @example
     * Tracker.fetch(`kills`).remove(player)
     */
    remove(player) {
        const inv = player.getComponent(`minecraft:inventory`).container
        const item = inv.getItem(player.selectedSlot)
        let lore = item?.getLore() ?? []
        let i = lore.findIndex(l => l.match(this.regex))
        if (i === -1 || !item) return
        lore.splice(i, 1)
        item.setLore(lore.length == 0 ? [``] : lore)
        inv.setItem(player.selectedSlot, item)
    }
    /**
     * Adds to a trackers value if its on a weapon
     * @param {Player} Player
     * @param {Number} Amount to add
     * @example
     * Tracker.fetch(`kills`).add(player, 1)
     */
    add(player, amount=1) {
        const inv = player.getComponent(`minecraft:inventory`).container
        const item = inv.getItem(player.selectedSlot)
        let lore = item?.getLore() ?? []
        let i = lore.findIndex(l => l.match(this.regex))

        if (i == -1 || !item) return
        const match = lore[i].match(this.regex)
        lore[i] = this.format.replace(`(value)`, parseInt(match[1]) + amount)
        item.setLore(lore)
        inv.setItem(player.selectedSlot, item)
    }

    /**
     * assigns a tracker to a weapon
     * @param {Player} Player
     * @example
     * Tracker.fetch(`kills`).assign(player, 1)
     */
    assign(player) {
        const inv = player.getComponent(`minecraft:inventory`).container
        const item = inv.getItem(player.selectedSlot)
        let lore = item?.getLore() ?? []

        if (lore.find(l => l.match(this.regex)) || !item) return

        lore.push(this.format.replace(`(value)`, 0))

        item.setLore(lore)

        inv.setItem(player.selectedSlot, item)
    }
    /**
     * Removes a tracker class from array of trackers
     * @example
     * Tracker.fetch(`kills`).purge()
     */
    purge() {
        Tracker.trackers.splice(Trackers.trackers.findIndex(t => t.id == this.id), 1)
    }
}

new Tracker({
    id: `kills`,
    format: `§r§cKills:§f (value)`
});


new Tracker({
    id: `hits`,
    format: `§r§eHits:§6 (value)`
});


