import { Endereco } from "./endereco.interface";

export interface Fornecedor {
    id: string;
    nome: string;
    documento: string;
    ativo: boolean;
    tipoFornecedor: number;
    fornecedorId: string;
    endereco: Endereco;
}