"use client"

import { useState } from "react"
import Board from "./Board"

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [currentMove, setCurrentMove] = useState(0)
    const currSquares = history[currentMove]
    const xIsNext = currentMove % 2 === 0

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1)
    }

    function jumpTo(move) {
        setCurrentMove(move)

    }

    const moves = history.map((squares, move) => {
        let description;
        if(move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
                <button className="border-1 rounded-md p-3 w-48 my-1 mx-1 " key={move} onClick={() => jumpTo(move)}>{description}</button>
        )
    })
   
    return (
        <div className="game">
            <div className="game-board flex-none flex-1 ">
                <Board squares={currSquares} xIsNext={xIsNext} onPlay={handlePlay} />
            </div>
            <div className="game-info flex-1 md:flex-wrap md:flex-col gap-8 mx-5  ">
                {moves}
            </div>
        </div>
    )
}