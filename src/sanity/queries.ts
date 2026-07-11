import { client } from "./client";

export interface Skill {
  skill: string;
  iconSource?: "picker" | "upload";
  icon?: {
    name?: string;
    provider?: string;
    svg?: string;
  };
  customIcon?: any;
}

export interface ProfileData {
  name: string;
  role: string;
  about: string;
  email: string;
  avatar?: any;
  skills?: Skill[];
}

export interface SocialsData {
  github?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  discord?: string;
}

export interface ProjectData {
  title: string;
  description: string;
  tags: string[];
  links?: { link: string; type: "github" | "website" }[];
  pinned?: boolean;
}

export interface ExperienceData {
  title: string;
  description: string;
  date: string;
}

export async function getProfile(): Promise<ProfileData | null> {
  try {
    return await client.fetch(`*[_type == "profile"][0]`);
  } catch (error) {
    console.error("Error fetching profile from Sanity:", error);
    return null;
  }
}

export async function getSocials(): Promise<SocialsData | null> {
  try {
    return await client.fetch(`*[_type == "socials"][0]`);
  } catch (error) {
    console.error("Error fetching socials from Sanity:", error);
    return null;
  }
}

export async function getProjects(): Promise<ProjectData[]> {
  try {
    return await client.fetch(`*[_type == "project"]`);
  } catch (error) {
    console.error("Error fetching projects from Sanity:", error);
    return [];
  }
}

export async function getExperiences(): Promise<ExperienceData[]> {
  try {
    return await client.fetch(`*[_type == "experience"] | order(_createdAt desc)`);
  } catch (error) {
    console.error("Error fetching experiences from Sanity:", error);
    return [];
  }
}
