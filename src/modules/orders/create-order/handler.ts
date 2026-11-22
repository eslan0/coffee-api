import type { Context } from "hono";

import { orderRepository } from "@/modules/orders/common/order.repository";
import { calculateOrderTotal } from "@/modules/orders/common/order-calculator";

import { createOrderDto } from "@/modules/orders/create-order/dto";

export async function createOrderHandler(c: Context) {
  const user = c.get("user");

  const body = await c.req.json();

  const input = createOrderDto(body);

  const items = await orderRepository.resolveItems(input.items);

  const total = calculateOrderTotal(items);

  const order = await orderRepository.create({
    customerId: user.id,
    items,
    totalCents: total,
    deliveryAddress: input.deliveryAddress,
  });

  return c.json(
    {
      data: {
        id: order.id,
        status: order.status,
        total: order.totalCents / 100,
      },
    },
    201
  );
}
