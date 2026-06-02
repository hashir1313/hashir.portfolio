import { defineField, defineType } from "sanity";

export const profile = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", title: "Full Name" }),
    defineField({ name: "role", type: "string", title: "Your Profession" }),
    defineField({ name: "about", type: "text", title: "About You" }),
    defineField({ name: "email", type: "string", title: "Email" }),
    defineField({ name: "avatar", type: "image", title: "Avatar" }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { type: "string", name: "skill", title: "Skill" },
            { name: 'icon', type: 'iconPicker', title: 'Icon' },
          ],
        },
      ],
    }),
    defineField({ name: 'pined', type: 'boolean', title: 'Pined' }),
  ],
});
