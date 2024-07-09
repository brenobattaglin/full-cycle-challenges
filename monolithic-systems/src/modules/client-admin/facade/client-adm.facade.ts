import UseCaseInterface from "../../@shared/domain/use-case.interface";
import ClientAdmFacadeInterface from "./client-adm.facade.interface";

export interface UseCaseProps {
  findUseCase: UseCaseInterface;
  addUseCase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _findUseCase: UseCaseInterface;
  private _addUseCase: UseCaseInterface;

  constructor(private usecaseProps: UseCaseProps) {
    this._findUseCase = usecaseProps.findUseCase;
    this._addUseCase = usecaseProps.addUseCase;
  }

  async add(input: any): Promise<void> {
    await this._addUseCase.execute(input);
  }

  async find(input: any): Promise<any> {
    return await this.usecaseProps.findUseCase.execute(input);
  }
}
