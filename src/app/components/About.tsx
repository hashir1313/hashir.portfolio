import { about as fallbackAbout } from "../../data/data";
import { getProfile } from "@/sanity/queries";

export default async function About() {
    const profile = await getProfile();
    const aboutText = profile?.about || fallbackAbout.about;
    const email = profile?.email || fallbackAbout.email;

    return (
        <>
            <div className="flex flex-col gap-2 mt-10 scroll-mt-14" id="about">
                <h2 className="text-xl font-medium before:content-['>'] before:mr-1">
                    About
                </h2>
                <div className="flex gap-2 flex-col">
                    <p className="text-base text-base-content/80">
                        {aboutText}
                    </p>
                    <p className="text-base text-base-content/80">
                        If you’ve got any questions or just feel like chatting,
                        send me an{" "}
                        <a
                            href={`mailto:${email}`}
                            className="font-bold hover:underline cursor-pointer"
                        >
                            (Email)
                        </a>{" "}
                        I’d love to hear from you.
                    </p>
                </div>
            </div>
        </>
    );
}
