import type { Product } from "@/modules/catalog/common/catalog.types";

export class CatalogRepository {
  async findAll(): Promise<Product[]> {
    // Aqui entraria a consulta ao banco de dados.
    return [];
  }

  async findById(id: string): Promise<Product | null> {
    // Consulta por identificador.
    return null;
  }
}
