import { createOrderSchema } from "@/modules/orders/create-order/schema";

export function createOrderDto(input: unknown) {
  return createOrderSchema.parse(input);
}
