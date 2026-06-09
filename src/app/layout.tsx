import "./globals.css";
import { seo } from "@/data/data";
import { getProfile } from "@/sanity/queries";

export async function generateMetadata() {
    const profile = await getProfile();
    if (profile) {
        return {
            title: `${profile.name} | ${profile.role}`,
            icons: {
                icon: [{ url: "/favicon.ico" }],
            },
            description: profile.about || seo.description,
            keywords: seo.keywords,
        };
    }
    return {
        title: `${seo.title}`,
        icons: {
            icon: [{ url: "/favicon.ico" }],
        },
        description: `${seo.description}`,
        keywords: `${seo.keywords}`,
    };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
        <html lang="en" data-theme="light" data-scroll-behavior="smooth">
            <head>
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=menu"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Rethink+Sans:ital,wght@0,400..800;1,400..800&display=swap"
                    rel="stylesheet"
                ></link>
            </head>
            <body className={`antialiased overflow-auto`}>
                {children}
            </body>
        </html>
    );
}
