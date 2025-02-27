"use client"
import { useState } from "react"
export default function Square({ value, handleClick }) {
    return (
        <button 
        onClick={handleClick}
        className="square border-1 h-full w-full  ">{value}</button>
    )
}