import { projects as fallbackProjects } from "@/data/data";
import Link from "next/link";
import { getProjects } from "@/sanity/queries";

export default async function ProjectsList() {
    const sanityProjects = await getProjects();
    
    // Extract pinned projects from Sanity, or fallback to static pinned projects if empty
    const pinnedProjects = sanityProjects.length > 0 
        ? sanityProjects.filter(p => p.pinned)
        : fallbackProjects.pinProjects;

    const getProjectLink = (item: any) => {
        if (typeof item.link === 'string') return item.link;
        const websiteLink = item.links?.find((l: any) => l.type === 'website')?.link;
        const githubLink = item.links?.find((l: any) => l.type === 'github')?.link;
        return websiteLink || githubLink || "";
    };

    return (
        <div className="mt-10 scroll-mt-14 flex flex-col gap-2" id="projects">
            <div className="flex items-end justify-between">
                <h2 className="text-xl font-medium before:content-['>'] before:mr-1">
                    Projects
                </h2>
                <Link href="/projects" className="text-sm flex underline hover:text-base-content/80">
                    See All
                </Link>
            </div>
            <div className="flex flex-col gap-2">
                {pinnedProjects.map((item, index) => {
                    const projectLink = getProjectLink(item);
                    return (
                        <a
                            href={projectLink || undefined}
                            key={index}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group cursor-pointer p-4 border-2 border-base-content/20 hover:border-base-content/80 rounded-2xl hover:scale-102 transition-transform duration-200"
                        >
                            <div className="flex flex-col gap-2 justify-between">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-lg">
                                        {item.title}
                                    </h3>
                                    <svg
                                        focusable="false"
                                        preserveAspectRatio="xMidYMid meet"
                                        fill="currentColor"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 32 32"
                                        aria-hidden="true"
                                        className="transform transition-transform duration-300 group-hover:rotate-45 group-active:rotate-45"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M10 6L10 8 22.59 8 6 24.59 7.41 26 24 9.41 24 22 26 22 26 6 10 6z"></path>
                                    </svg>
                                </div>
                                <p className="text-base-content/80 text-sm sm:text-base">
                                    {item.description}
                                </p>
                                <div className="flex items-center flex-wrap gap-2 mt-1">
                                    {item.tags?.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="text-xs border-gray-400 font-medium text-base-content/70 border rounded-md px-4"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
