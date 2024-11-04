//npx tsx server.ts

import {MoonPhases} from "./MoonPhases"
import {Slot} from "./Slot"
import {Card} from "./Card"
import {Grid} from "./Grid"

import express from "express"
import WebSocket from "ws"
import * as path from "path"

const app = express()
//app.use(express.static(path.join(__dirname, "/views")))

let grid1 = new Grid(9, 9)
grid1.array[4][4].active = false
grid1.connectGridInAllDirections()

console.log(JSON.stringify(grid1.getShortcut()).length)
console.log(JSON.stringify(Grid.createFromShortCut(grid1.getShortcut()).getShortcut()))