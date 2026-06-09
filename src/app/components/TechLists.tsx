import Marquee from "./Marquee";
import { skills as fallbackSkills } from "@/data/data";
import { getProfile } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

export default async function TechLists() {
    const profile = await getProfile();
    
    // Map profile skills if they exist, otherwise fallback to static skills
    const skillsList = (profile?.skills && profile.skills.length > 0)
        ? profile.skills.map(s => ({
            name: s.skill,
            alt: `${s.skill} logo`,
            iconSource: s.iconSource || "picker",
            icon: s.icon,
            customIcon: s.customIcon
          }))
        : fallbackSkills.map(s => ({
            name: s.name,
            alt: s.alt,
            iconSource: "static" as const,
            icon: s.icon,
            customIcon: null
          }));

    return (
        <div className="mt-10">
             <h2 className="text-xl font-medium before:content-['>'] before:mr-1">Tech Stack</h2>
            <Marquee duration="10s">
                <div className="flex gap-8 mt-4">
                    {[...skillsList, ...skillsList].map((skill, index) => {
                        let iconSvg: string | null = null;
                        let imageUrl: string | null = null;

                        if (skill.iconSource === "upload" && skill.customIcon) {
                            try {
                                imageUrl = urlFor(skill.customIcon).url();
                            } catch (e) {
                                console.error("Failed to parse customIcon:", e);
                            }
                        } else if (skill.iconSource === "picker" && typeof skill.icon === "object" && skill.icon?.svg) {
                            iconSvg = skill.icon.svg;
                        } else if (typeof skill.icon === "string") {
                            imageUrl = skill.icon;
                        }

                        return (
                            <div
                                key={index}
                                className="flex flex-col items-center gap-2 w-[80px] p-2"
                            >
                                <div 
                                    className={`border-2 p-2 border-base-content/20 shadow-md rounded-sm flex items-center justify-center w-14 h-14 ${
                                        iconSvg ? "bg-white text-black" : "dark:bg-base-content"
                                    }`}
                                >
                                    {iconSvg ? (
                                        <div 
                                            className="w-10 h-10 flex items-center justify-center [&_svg]:!w-full [&_svg]:!h-full [&_svg]:!block [&_svg]:!fill-black [&_svg]:!stroke-black"
                                            dangerouslySetInnerHTML={{ __html: iconSvg }}
                                        />
                                    ) : (
                                        <img
                                            src={imageUrl || ''}
                                            className="w-10 h-10 object-contain"
                                            alt={skill.alt}
                                        />
                                    )}
                                </div>
                                <span className="text-sm truncate w-full text-center">{skill.name}</span>
                            </div>
                        );
                    })}
                </div>
            </Marquee>
        </div>
    );
}
