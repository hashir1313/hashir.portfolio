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
            {
              name: "iconSource",
              type: "string",
              title: "Icon Source",
              options: {
                list: [
                  { title: "Icon Picker", value: "picker" },
                  { title: "Custom Upload (SVG/Image)", value: "upload" },
                ],
              },
              initialValue: "picker",
            },
            { 
              name: 'icon', 
              type: 'iconPicker', 
              title: 'Icon Picker',
              options: {
                storeSvg: true
              },
              hidden: ({ parent }) => parent?.iconSource === "upload",
            },
            {
              name: 'customIcon',
              type: 'image',
              title: 'Custom Icon Upload',
              hidden: ({ parent }) => parent?.iconSource !== "upload",
            },
          ],
        },
      ],
    }),
  ],
});
