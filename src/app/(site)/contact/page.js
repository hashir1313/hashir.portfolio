import React from "react";
import { seo } from "@/data/data";
import { getProfile } from "@/sanity/queries";
import ContactForm from "@/app/components/ContactForm";

export async function generateMetadata() {
    const profile = await getProfile();
    const seoTitle = profile ? `${profile.name} | ${profile.role}` : seo.title;
    return {
        title: `Contact Me | ${seoTitle}`,
        description: "Get in touch with me to discuss projects, collaborations, or just to say hello.",
        keywords: "contact, get in touch, collaboration, email, message, web developer"
    };
}

function Contact() {
    return (
        <>
            <div className="md:w-[700px] w-[100%] mt-5 p-4">
                <main className="flex flex-col gap-2">
                    <h1 className="text-xl font-medium before:content-['>'] before:mr-1">
                        Contact Me
                    </h1>
                    <div className="p-1">
                        <ContactForm />
                    </div>
                </main>
            </div>
        </>
    );
}

export default Contact;
