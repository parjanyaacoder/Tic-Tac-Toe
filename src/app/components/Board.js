"use client"
import { useState } from "react"
import Square from "./Square"

function checkWinner(squares) {
    const winnerPositions = [[0,1,2],[0,3,6],[3,4,5],[6,7,8],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    for(const winnerPosition of winnerPositions) {
        if(squares[winnerPosition[0]] === squares[winnerPosition[1]] && squares[winnerPosition[0]] === squares[winnerPosition[2]]) 
            return squares[winnerPosition[0]]
    }
    return null
}   

export default function Board({ squares, xIsNext, onPlay }) {
    const winner = checkWinner(squares)
    let status;

    if(winner) {
        status = "Winner: " + winner
    } else {
        if(squares.findIndex((val) => val === null ) === -1) 
            status = "The game is draw"
        else 
        status = "Next player: " + (xIsNext ? "X" : "O" ) 
    }

    function onSquareClick( value ) {
        const newSquares = squares.slice()
        
        if (newSquares[value] || checkWinner(squares)) return 

        newSquares[value] = xIsNext ? 'X' : 'O'
        onPlay(newSquares)
    }

    return (
    <>
        <div className="status" >{status}</div>
        <div className="board-row d -my-8" >
            <Square value={squares[0]} handleClick={() => onSquareClick(0)} />
            <Square value={squares[1]} handleClick={() => onSquareClick(1)} />
            <Square value={squares[2]} handleClick={() => onSquareClick(2)} />
        </div>
        <div className="board-row  " >
            <Square value={squares[3]} handleClick={() => onSquareClick(3)} />
            <Square value={squares[4]} handleClick={() => onSquareClick(4)} />
            <Square value={squares[5]} handleClick={() => onSquareClick(5)} />
        </div>
        <div className="board-row -my-8 " >
            <Square value={squares[6]} handleClick={() => onSquareClick(6)} />
            <Square value={squares[7]} handleClick={() => onSquareClick(7)} />
            <Square value={squares[8]} handleClick={() => onSquareClick(8)} />
        </div>
    </>
    )
}