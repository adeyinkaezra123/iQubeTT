import { FC } from "react"
function BackgroundWrapper<FC>({ children }: { children: React.ReactNode }) {
    return (
        <main className="clipped_background h-screen w-full">
            <div className="ee">
                {children}
            </div>

        </main>
    )
}

export default BackgroundWrapper