import { z } from "zod";
import { portfolioPageSchema } from "./schema";


// Additional types for components
export interface TagFieldProps {
  siteIndex: number;
  tagIndex: number;
}

export interface DescriptionFieldProps {
  siteIndex: number;
}

export interface SiteItemProps {
  index: number;
  remove: () => void;
}
