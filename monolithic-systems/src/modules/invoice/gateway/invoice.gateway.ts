import { InvoiceItem } from "../domain/entity/invoice-item.entity";
import { Invoice } from "../domain/entity/invoice.entity";

export default interface InvoiceGateway {
	find(id: string): Promise<Invoice>;
	generate(invoice: Invoice): Promise<void>;
}
