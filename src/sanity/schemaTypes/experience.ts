import { defineField, defineType } from "sanity";

export const experience = defineType({
    name: "experience",
    title: "Experience",
    type: "document",
    fields: [
        defineField({ name: "title", type: "string", title: "Title" }),
        defineField({ name: "description", type: "text", title: "Description" }),
        defineField({ name: "date", type: "string", title: "Date" }),
    ],
});