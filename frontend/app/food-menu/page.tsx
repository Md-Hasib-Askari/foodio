import React from 'react'
import Navbar from '../components/layout/Navbar'
import AllMenu from '../components/layout/AllMenu'

export default function FoodMenu() {
    return (
        <div className="relative min-h-screen bg-background text-foreground">
            <Navbar />
            <AllMenu />
        </div>
    )
}
