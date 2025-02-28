"use client"

import { useState } from "react"
import Board from "./Board"
import Cookies from "js-cookie"
import { useSession, signIn } from "next-auth/react"

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [currentMove, setCurrentMove] = useState(0)
    const [playGame, setPlayGame] = useState(false)
    const gamesPlayedThreshold = 3
    const currSquares = history[currentMove]
    const xIsNext = currentMove % 2 === 0

    const { data: session, status } = useSession()

    function enablePlayCta() {
        setPlayGame(false)
    }

    function onPlayCtaPress() {
        let gamesPlayed = Cookies.get('gamesPlayed')
        console.log(gamesPlayed, !gamesPlayed, (gamesPlayed === undefined))
        if (gamesPlayed === undefined) {
            gamesPlayed = 0
        } else {
            gamesPlayed = parseInt(gamesPlayed)
        }
        if (gamesPlayed + 1 > gamesPlayedThreshold && !session) {
            signIn('google').then(() => {
                Cookies.set('gamesPlayed', gamesPlayed + 1)
                setHistory([Array(9).fill(null)])
                setCurrentMove(0)
                setPlayGame(true)
            })
        } else {
            Cookies.set('gamesPlayed', gamesPlayed + 1)
            setHistory([Array(9).fill(null)])
            setCurrentMove(0)
            setPlayGame(true)
        }
    }

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
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <button className="border-1 rounded-md p-3 w-48 my-1 mx-1 " key={move} onClick={() => jumpTo(move)}>{description}</button>
        )
    })

    return (
        <>
            <div className="game">
                <div className="game-board flex-none flex-1 ">
                    <Board squares={currSquares} xIsNext={xIsNext} onPlay={handlePlay} playGame={playGame} onPlayCtaPress={onPlayCtaPress} enablePlayCta={enablePlayCta} />
                </div>
                <div className="game-info flex-1 md:flex-wrap md:flex-col gap-8 mx-5  ">
                    {moves}
                </div>
            </div>
        </>
    )
}