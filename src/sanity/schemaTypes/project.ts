import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "description", type: "text", title: "Description" }),
    defineField({
      name: "tags",
      type: "array",
      title: "Tags",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "links",
      type: "array",
      title: "Links",
      of: [
        {
          type: "object",
          fields: [
            { type: "url", name: "link", title: "Link" },
            {
              type: "string",
              name: "type",
              title: "Type",
              options: {
                list: [
                  { title: "GitHub", value: "github" },
                  { title: "Website", value: "website" },
                ],
              },
            },
          ],
        },
      ],
    }),
    defineField({ name: "pinned", type: "boolean", title: "Pinned", initialValue: false }),
  ],
});
