import Id from "../../@shared/domain/value-object/id.value-object";
import Transaction from "../domain/transaction";
import ProcessPaymentUseCase from "./process-payment.usecase";

const approvedTransaction = new Transaction({
	id: new Id(),
	amount: 100,
	orderId: "1",
	status: "approved",
});

const declinedTransaction = new Transaction({
	id: new Id(),
	amount: 100,
	orderId: "1",
	status: "declined",
});

const MockRepositoryApproved = () => {
	return {
		save: jest.fn().mockReturnValue(Promise.resolve(approvedTransaction)),
	};
};

const MockRepositoryDeclined = () => {
	return {
		save: jest.fn().mockReturnValue(Promise.resolve(declinedTransaction)),
	};
};

describe("process payment usecase unit test", () => {
	it("should approve transaction", async () => {
		const repository = MockRepositoryApproved();
		const usecase = new ProcessPaymentUseCase(repository);
		const input = {
			orderId: "1",
			amount: 100,
		};

		const result = await usecase.execute(input);

		expect(result.transactionId).toBe(approvedTransaction.id.id);
		expect(repository.save).toHaveBeenCalled();
		expect(result.status).toBe("approved");
		expect(result.amount).toBe(100);
		expect(result.orderId).toBe("1");
		expect(result.createdAt).toBe(approvedTransaction.createdAt);
		expect(result.updatedAt).toBe(approvedTransaction.updatedAt);
	});

	it("should decline a transaction", async () => {
		const repository = MockRepositoryDeclined();
		const usecase = new ProcessPaymentUseCase(repository);
		const input = {
			orderId: "1",
			amount: 50,
		};

		const result = await usecase.execute(input);

		expect(result.transactionId).toBe(declinedTransaction.id.id);
		expect(repository.save).toHaveBeenCalled();
		expect(result.status).toBe("declined");
		expect(result.amount).toBe(100);
		expect(result.orderId).toBe("1");
		expect(result.createdAt).toBe(declinedTransaction.createdAt);
		expect(result.updatedAt).toBe(declinedTransaction.updatedAt);
	});
});
