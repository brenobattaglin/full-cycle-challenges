import Id from "../../@shared/domain/value-object/id.value-object";
import transaction from "../domain/transaction";
import Transaction from "../domain/transaction";
import PaymentGateway from "../gateway/payment.gateway";
import TransactionModel from "./transaction.model";

export default class TransactionRepository implements PaymentGateway {
	async save(input: transaction): Promise<transaction> {
		await TransactionModel.create({
			id: input.id.id,
			orderId: input.orderId,
			amount: input.amount,
			status: input.status,
			createdAt: input.createdAt,
			updatedAt: input.updatedAt,
		});

		return new Transaction({
			id: new Id(input.id.id),
			orderId: input.orderId,
			amount: input.amount,
			status: input.status,
			createdAt: input.createdAt,
			updatedAt: input.updatedAt,
		});
	}
}
