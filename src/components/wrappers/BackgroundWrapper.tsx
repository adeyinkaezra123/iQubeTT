function BackgroundWrapper({ children }: { children: React.ReactNode }) {
    return (
        <main className="clipped_background h-screen w-full">
            <div className="min-h-screen p-4 lg:p-12 items-center flex flex-col w-full">
                <div className="min-w-max w-[45%] space-y-8 z-[10]">
                    {children}
                </div>
            </div>
        </main>
    )
}

export default BackgroundWrapper