import { defineField, defineType } from "sanity";

export const contactSubmission = defineType({
  name: "contactSubmission",
  title: "Contact Submission",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", title: "Name" }),
    defineField({ name: "email", type: "string", title: "Email" }),
    defineField({ name: "message", type: "text", title: "Message" }),
    defineField({
      name: "read",
      type: "boolean",
      title: "Read",
      initialValue: false,
    }),
    defineField({
      name: "createdAt",
      type: "datetime",
      title: "Submitted At",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: "Newest First",
      name: "createdAtDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
  ],
});
