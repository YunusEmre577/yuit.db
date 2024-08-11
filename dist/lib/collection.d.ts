export declare class CollectionDB {
    collectionName: string;
    constructor(collectionName: string);
    deleteAll(): Promise<void>;
    find(key: Record<string, any>): Promise<Record<string, any>[]>;
    update(key: Record<string, any>, updateValues: Record<string, any>): Promise<void>;
    findAll(): Promise<Record<string, any>[]>;
    findOneAndDeleteAll(key: Record<string, any>): Promise<void>;
    insert(collectionContent: Record<string, any>[]): Promise<void>;
}
