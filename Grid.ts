import {Slot} from "./Slot"

export class Grid {
    static readonly allDirections: number[][] = [
        [1,0],
        [1,1],
        [0,1],
        [-1,1],
        [-1,0],
        [-1,-1],
        [0,-1],
        [1,-1]
    ]
    static readonly adjacent: number[][] = [
        [1,0],
        [0,1],
        [-1,0],
        [0,-1]
    ]
    static readonly diagonal: number[][] = [
        [1,1],
        [-1,1],
        [-1,-1],
        [1,-1]
    ]

    static createFromShortCut(json: any) {
        let g = new Grid(json.rows, json.columns)
        for(let cell of json.unactive) {
            g.array[cell[0]][cell[1]].active = false
        }
        for(let connection of json.connections) {
            g.connectAbsolute(connection[0][0], connection[0][1], connection[1][0], connection[1][1])
        }
        return g
    }

    readonly rows: number
    readonly columns: number
    readonly array: Slot[][]

    constructor(rows: number, columns: number) {
        this.rows = rows
        this.columns = columns
        this.array = new Array(rows).fill(null).map(function(e, r) {
            return new Array(columns).fill(null).map(function(e, c) {
                let slot = new Slot()
                slot.row = r
                slot.column = c
                return slot
            })
        })
    }

    connectAbsolute(r: number, c: number, ar: number, ac: number) {
        try {
            if (this.array[r][c].active && this.array[ar][ac].active) {
                this.array[r][c].addConnection(this.array[ar][ac])
            }
        } catch (error) {
            return
        }
    }

    connectRelative(r: number, c:number, rr: number, rc: number) {
        try {
            if (this.array[r][c].active && this.array[r+rr][c+rc].active) {
                this.array[r][c].addConnection(this.array[r+rr][c+rc])
            }
        } catch(error) {
            return
        }
    }

    connectSlotWithPattern(r: number, c: number, pattern: number[][]) {
        for (let point of pattern) {
            this.connectRelative(r, c, point[0], point[1])
        }
    }

    connectGridWithPattern(pattern: number[][]) {
        for (let r in this.array) {
            for (let c in this.array[r]) {
                this.connectSlotWithPattern(parseInt(r), parseInt(c), pattern)
            }
        }
    }

    connectSlotInAllDirections(r:number, c:number) {
        this.connectSlotWithPattern(r, c, Grid.allDirections)
    }

    connectGridInAllDirections() {
        this.connectGridWithPattern(Grid.allDirections)
    }

    connectSlotAdjacently(r: number, c:number) {
        this.connectSlotWithPattern(r, c, Grid.adjacent)
    }

    connectGridAdjacently() {
        this.connectGridWithPattern(Grid.adjacent)
    }

    connectSlotDiagonally(r: number, c:number) {
        this.connectSlotWithPattern(r, c, Grid.diagonal)
    }

    connectGridDiagonally() {
        this.connectGridWithPattern(Grid.diagonal)
    }

    getShortcut() {
        let connections: number[][][] = []
        let unactive: number[][] = []
        for(let r in this.array) {
            for(let c in this.array[r]) {
                let slot = this.array[r][c]
                if (slot.active) { 
                    for(let connection of Array.from(slot.connections)) {
                        if (!(connection.row < slot.row || connection.column < slot.column)) {
                            connections.push([[slot.row, slot.column], [connection.row, connection.column]])
                        }
                    }
                } else {
                    unactive.push([slot.row, slot.column])
                }
            }
        }
        return {
            rows: this.rows,
            columns: this.columns,
            connections: connections,
            unactive: unactive,
        }
    }
}