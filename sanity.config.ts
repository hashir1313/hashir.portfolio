import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { iconPicker } from "sanity-plugin-icon-picker";
import { schemaTypes } from "@/sanity/schemaTypes";


// 1. Added 'navigation' to the singleton set
const singletonTypes = new Set(["profile", "socials"]);

// 2. Define the singleton actions
const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "default",
  title: "Portfolio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singleton: Profile
            S.listItem()
              .title("Profile")
              .id("profile")
              .child(S.document().schemaType("profile").documentId("profile")),

            S.listItem()
              .title("Socails")
              .id("socials")
              .child(
                S.document()
                  .schemaType("socials")
                  .documentId("socials") // Forces a single document with this ID
              ),

            S.divider(),

            // List the rest (Services, Portfolio, Post), filtering out singletons
            ...S.documentTypeListItems().filter(
              (listItem) => !singletonTypes.has(listItem.getId() as string),
            ),
          ]),
    }),
    visionTool(),
    iconPicker() as any,
  ],

  schema: {
    types: schemaTypes,
    templates: (prev) =>
      prev.filter((template) => !singletonTypes.has(template.id)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});