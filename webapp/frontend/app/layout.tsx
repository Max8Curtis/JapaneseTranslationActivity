import type { Metadata } from 'next'
import '../src/index.css'

export const metadata: Metadata = {
    title: 'Japanese Translation',
    description: 'Application for practicing Japanese translation.',
}


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <div id="root">{children}</div>
            </body>
        </html>
    )
}