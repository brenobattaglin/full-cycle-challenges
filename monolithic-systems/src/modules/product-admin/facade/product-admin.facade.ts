import UseCaseInterface from "../../@shared/domain/use-case.interface";
import ProductAdmFacadeInterface, {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto,
} from "./product-admin.facade.interface";

export interface UseCasesProps {
  addUsecase: UseCaseInterface;
  stockUsecase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addUsecase: UseCaseInterface;
  private _checkStockUsecase: UseCaseInterface;

  constructor(usecasesProps: UseCasesProps) {
    this._addUsecase = usecasesProps.addUsecase;
    this._checkStockUsecase = usecasesProps.stockUsecase;
  }

  async addProduct(input: AddProductFacadeInputDto): Promise<void> {
    // caso o dto do caso de uso for diferente do dto da facade,
    // é necessário fazer a conversão para o dto do caso de uso
    return await this._addUsecase.execute(input);
  }

  async checkStock(
    input: CheckStockFacadeInputDto
  ): Promise<CheckStockFacadeOutputDto> {
    return await this._checkStockUsecase.execute(input);
  }
}
