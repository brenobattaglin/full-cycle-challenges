import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Transaction from "../domain/transaction";
import PaymentFacadeFactory from "../factory/payment.facade.factory";
import TransactionModel from "../repository/transaction.model";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment.usecase";
import PaymentFacade from "./payment.facade";

describe("payment repository test", () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});

		sequelize.addModels([TransactionModel]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it("should create a transaction", async () => {
		const facade = PaymentFacadeFactory.create();
		const input = {
			orderId: "order-1",
			amount: 100,
		};

		const output = await facade.process(input);

		expect(output.transactionId).toBeDefined();
		expect(output.status).toBe("approved");
		expect(output.amount).toBe(100);
		expect(output.orderId).toBe("order-1");
		expect(output.createdAt).toBeDefined();
		expect(output.updatedAt).toBeDefined();
	});
});
