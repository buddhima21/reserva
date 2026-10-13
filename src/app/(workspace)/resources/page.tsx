import type { Metadata } from "next";
import { ResourceCatalog } from "@/components/resources/resource-catalog";
import { ResourcesHeading } from "@/components/resources/resources-heading";

export const metadata: Metadata = { title: "Resources" };

export default function ResourcesPage() {
  return <><ResourcesHeading /><ResourceCatalog /></>;
}
