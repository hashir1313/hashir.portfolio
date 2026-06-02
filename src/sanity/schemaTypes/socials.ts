import { defineField, defineType } from "sanity";

export const socials = defineType({
    name: "socials",
    title: "Socials",
    type: "document",
    fields: [
        defineField({ name: "github", type: "url", title: "Github" }),
        defineField({ name: "twitter", type: "url", title: "Twitter" }),
        defineField({ name: "instagram", type: "url", title: "Instagram" }),
        defineField({ name: "facebook", type: "url", title: "Facebook" }),
    ],
})