import { MoonPhases } from "./MoonPhases"

export class Card {
    public moonPhase: MoonPhases

    constructor(moonPhase: MoonPhases) {
        this.moonPhase = moonPhase
    }

    public add(value: number) {
        let phase: number = this.moonPhase
        return (phase + value) % 8
    }

    public sub(value: number) {
        let phase: number = this.moonPhase
        return (phase - value) % 8
    }

    //Matches
    public match(card: Card) {
        if (card.moonPhase == this.moonPhase) {
            return true
        }
        return false
    }

    //Complements
    public complement(card: Card) {
        if (this.add(4) == card.moonPhase) {
            return true
        }
        return false
    }

    //
    public next(card: Card) {
        if (this.add(1) == card.moonPhase) {
            return true
        }
        return false
    }

    public last(card: Card) {
        if (this.sub(1) == card.moonPhase) {
            return true
        }
        return false
    }
}