import fs from "node:fs/promises";
export class CollectionDB {
    collectionName;
    constructor(collectionName) {
        this.collectionName = collectionName;
    }
    ;
    async deleteAll() {
        try {
            await fs.writeFile(`databases/${this.collectionName}.json`, JSON.stringify([], null, 0), "utf-8");
        }
        catch {
            await fs.writeFile(`databases/${this.collectionName}.json`, JSON.stringify([], null, 0), "utf-8");
        }
    }
    async find(key) {
        try {
            const getFile = await fs.readFile(`databases/${this.collectionName}.json`);
            const content = JSON.parse(getFile.toString());
            return content.filter(item => Object.keys(key).some(k => item[k] === key[k]));
        }
        catch {
            return [];
        }
    }
    async update(key, updateValues) {
        try {
            const getFile = await fs.readFile(`databases/${this.collectionName}.json`);
            let content = JSON.parse(getFile.toString());
            content = content.map(item => {
                if (Object.keys(key).some(k => item[k] == key[k])) {
                    return { ...item, ...updateValues };
                }
                ;
                return item;
            });
            await fs.writeFile(`databases/${this.collectionName}.json`, JSON.stringify(content, null, 0), "utf-8");
        }
        catch {
            return;
        }
    }
    async findAll() {
        try {
            const getFile = await fs.readFile(`databases/${this.collectionName}.json`);
            let content = JSON.parse(getFile.toString());
            return content;
        }
        catch {
            return [];
        }
    }
    async findOneAndDeleteAll(key) {
        try {
            const getFile = await fs.readFile(`databases/${this.collectionName}.json`);
            let content = JSON.parse(getFile.toString());
            content = content.filter(item => {
                return !Object.keys(key).every(k => item[k] == key[k]);
            });
            await fs.writeFile(`databases/${this.collectionName}.json`, JSON.stringify(content, null, 0), "utf-8");
        }
        catch (e) {
            return console.error(e);
        }
    }
    async insert(collectionContent) {
        try {
            const getFile = await fs.readFile(`databases/${this.collectionName}.json`);
            let content = [];
            content = JSON.parse(getFile.toString());
            content.push(collectionContent);
            content = content.flat();
            await fs.writeFile(`databases/${this.collectionName}.json`, JSON.stringify(content, null, 0), "utf-8");
        }
        catch {
            await fs.writeFile(`databases/${this.collectionName}.json`, JSON.stringify(collectionContent, null, 2), "utf-8");
        }
    }
}
