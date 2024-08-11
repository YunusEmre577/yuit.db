export declare class ClassicDB {
    DBName: string;
    constructor(DBName: string);
    add(key: string, value: number): Promise<void>;
    substr(key: string, value: number): Promise<void>;
    pull(key: string, value: any): Promise<void>;
    private isObjectEqual;
    push(key: string, value: any): Promise<void>;
    delete(key: string): Promise<void>;
    get(key: string): Promise<any>;
    set(key: string, value: any): Promise<void>;
}
