import UseCaseInterface from "../../@shared/domain/use-case.interface";
import InvoiceFacadeInterface, {
  FindInvoiceFacadeInputDto,
  FindInvoiceFacadeOutputDTO,
  GenerateInvoiceFacadeInputDto,
  GenerateInvoiceFacadeOutputDto,
} from "./invoice.facade.interface";

export interface UseCasesProps {
  findUsecase: UseCaseInterface;
  generateUsecase: UseCaseInterface;
}
export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _findInvoiceUsecase: UseCaseInterface;
  private _generateUsecase: UseCaseInterface;

  constructor(usecasesProps: UseCasesProps) {
    this._findInvoiceUsecase = usecasesProps.findUsecase;
    this._generateUsecase = usecasesProps.generateUsecase;
  }

  async findInvoice(
    input: FindInvoiceFacadeInputDto
  ): Promise<FindInvoiceFacadeOutputDTO> {
    return await this._findInvoiceUsecase.execute(input);
  }

  async generateInvoice(
    input: GenerateInvoiceFacadeInputDto
  ): Promise<GenerateInvoiceFacadeOutputDto> {
    return await this._generateUsecase.execute(input);
  }
}
