import type { Metadata } from "next";
import { ResourceForm } from "@/components/resources/resource-form";

export const metadata: Metadata = { title: "Add Resource" };
export default function NewResourcePage() { return <ResourceForm />; }
