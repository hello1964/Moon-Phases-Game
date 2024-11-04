import { MoonPhases } from "./MoonPhases"
import {Card} from "./Card"

export class Slot {
    private _card: Card | null = null
    private _active: boolean = true
    public row: number = 0
    public column: number = 0
    readonly connections = new Set<Slot>()

    get card() {
        if (this._active) {
            return this._card
        } else {
            return null
        }
    }

    set card(value: Card | null) {
        if (this._active) {
            this._card = value
        }
    }

    get active() {
        return this._active
    }

    set active(value: boolean) {
        this._active = value
        if (!value) {
            this._card = null
            for (let slot of Array.from(this.connections)) {
                slot.removeConnection(this)
            }
        }
    }

    addConnection(slot: Slot) {
        if (slot === this || !this.active || !slot.active) {
            return
        }
        this.connections.add(slot)
        slot.addOtherConnection(this)
    }

    addOtherConnection(slot: Slot) {
        if (slot === this || !this.active || !slot.active) {
            return
        }
        this.connections.add(slot)
    }

    removeConnection(slot: Slot) {
        if (slot === this || !this.active || !slot.active) {
            return
        }
        this.connections.delete(slot)
        slot.removeOtherConnection(this)
    }

    removeOtherConnection(slot: Slot) {
        if (slot === this || !this.active || !slot.active) {
            return
        }
        this.connections.delete(slot)
    }

    removeAllConnections() {
        for (let slot of this.connections) {
            this.removeConnection(slot)
        }
    }
}