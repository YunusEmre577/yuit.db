import fs from "node:fs/promises";
export class CollectionDB {
    collectionName:string
    constructor(collectionName:string) {
        this.collectionName = collectionName
    };
    async deleteAll() {
        try {
            await fs.writeFile(`databases/${this.collectionName}.json`, JSON.stringify([], null, 0), "utf-8")
        } catch {
            await fs.writeFile(`databases/${this.collectionName}.json`, JSON.stringify([], null, 0), "utf-8")
        }
    }
    async find(key: Record<string, any>): Promise<Record<string, any>[]> {
        try {
            const getFile = await fs.readFile(`databases/${this.collectionName}.json`);
            const content: Record<string, any>[] = JSON.parse(getFile.toString());
                return content.filter(item =>
                Object.keys(key).some(k =>
                    item[k] === key[k] 
                )
            );
        } catch {
            return [];
        }
    }
    async update(key: Record<string, any>, updateValues: Record<string,any>): Promise<void> {
        try {
            const getFile = await fs.readFile(`databases/${this.collectionName}.json`);
            let content: Record<string, any>[] = JSON.parse(getFile.toString());

            content = content.map(item => {
                if(Object.keys(key).some(k => item[k] == key[k])) {
                    return {...item, ...updateValues}
                };
                return item;
            })
            await fs.writeFile(`databases/${this.collectionName}.json`, JSON.stringify(content, null, 0), "utf-8");
        } catch {
            return;
        }
    }
    async findAll(): Promise<Record<string, any>[]> {
        try {
            const getFile = await fs.readFile(`databases/${this.collectionName}.json`);
            let content:Record<string, any>[] = JSON.parse(getFile.toString());
            return content;
        } catch {
            return []
        }
    }
    async findOneAndDeleteAll(key:Record<string, any>) {
        try {
        const getFile = await fs.readFile(`databases/${this.collectionName}.json`);
        let content:Record<string, any>[] = JSON.parse(getFile.toString())
        content = content.filter(item => {
            return !Object.keys(key).every(k => item[k] == key[k])
        })

        await fs.writeFile(`databases/${this.collectionName}.json`, JSON.stringify(content, null, 0), "utf-8")
        } catch(e) {
            return console.error(e)
        }
    }
    async insert(collectionContent: Record<string, any>[]): Promise<void> {
        try {            
        const getFile = await fs.readFile(`databases/${this.collectionName}.json`);
        let content: Record<string, any>[] = [];
        content = JSON.parse(getFile.toString());
        content.push(collectionContent);
        content = content.flat();

        await fs.writeFile(`databases/${this.collectionName}.json`, JSON.stringify(content, null, 0), "utf-8")
        } catch {
            await fs.writeFile(`databases/${this.collectionName}.json`, JSON.stringify(collectionContent, null, 2), "utf-8")
        }
    }
}