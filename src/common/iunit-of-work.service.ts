import { ITransactionalRepositories } from "../auth/repositories/itransactional.repositories.js";

export interface IUnitOfWork {

    execute<T>(work: (repositories: ITransactionalRepositories) => Promise<T>): Promise<T>;
}