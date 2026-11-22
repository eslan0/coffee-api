import type { z } from "zod";
import type { listProductsSchema } from "@/modules/catalog/list-products/schema";

export type ListProductsDTO = z.infer<typeof listProductsSchema>;
