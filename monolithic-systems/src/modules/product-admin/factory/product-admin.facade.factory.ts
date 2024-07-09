import ProductAdmFacade from "../facade/product-admin.facade";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";

export default class ProductAdmFacadeFactory {
  static create() {
    const productRepository = new ProductRepository();
    const addProductUsecase = new AddProductUseCase(productRepository);
    const checkStockUseCase = new CheckStockUseCase(productRepository);
    const productAdmFacade = new ProductAdmFacade({
      addUsecase: addProductUsecase,
      stockUsecase: checkStockUseCase,
    });

    return productAdmFacade;
  }
}
