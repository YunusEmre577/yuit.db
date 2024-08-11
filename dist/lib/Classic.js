import fs from "node:fs/promises";
export class ClassicDB {
    DBName;
    constructor(DBName) {
        this.DBName = DBName;
    }
    ;
    async add(key, value) {
        try {
            const getFileContent = await fs.readFile(`databases/${this.DBName}.json`);
            let content = JSON.parse(getFileContent.toString());
            if (typeof value != "number")
                throw new Error(`${value} || Is not number! is ${typeof value}`);
            if (key in content) {
                content[key] += value;
            }
            else {
                content = { ...content, [key]: value };
            }
            ;
            await fs.writeFile(`databases/${this.DBName}.json`, JSON.stringify(content, null, 0), "utf-8");
        }
        catch {
            return console.error("First db.set() method or add value's is \"not number\"!");
        }
    }
    async substr(key, value) {
        try {
            const getFileContent = await fs.readFile(`databases/${this.DBName}.json`);
            let content = JSON.parse(getFileContent.toString());
            if (typeof value != "number")
                throw new Error(`${value} || Is not number! is ${typeof value}`);
            if (key in content) {
                content[key] -= value;
            }
            else {
                content = { ...content, [key]: value };
            }
            ;
            await fs.writeFile(`databases/${this.DBName}.json`, JSON.stringify(content, null, 0), "utf-8");
        }
        catch {
            return console.error("First db.set() method or add value's is \"not number\"!");
        }
    }
    async pull(key, value) {
        try {
            const getFileContent = await fs.readFile(`databases/${this.DBName}.json`);
            let content = JSON.parse(getFileContent.toString());
            if (key in content) {
                if (Array.isArray(content[key])) {
                    content[key] = content[key].filter(item => !this.isObjectEqual(item, value));
                }
            }
            await fs.writeFile(`databases/${this.DBName}.json`, JSON.stringify(content, null, 0), "utf-8");
        }
        catch {
            return;
        }
    }
    isObjectEqual(item, value) {
        return Object.keys(value).some(key => item[key] === value[key]);
    }
    async push(key, value) {
        try {
            const getFileContent = await fs.readFile(`databases/${this.DBName}.json`);
            let content = JSON.parse(getFileContent.toString());
            if (key in content) {
                if (!Array.isArray(content[key])) {
                    content[key] = [content[key]];
                }
                content[key].push(value);
            }
            else {
                content[key] = [value];
            }
            content[key] = content[key].flat();
            await fs.writeFile(`databases/${this.DBName}.json`, JSON.stringify(content, null, 0), "utf-8");
        }
        catch (err) {
            return console.error(err);
        }
    }
    async delete(key) {
        try {
            const getFileContent = await fs.readFile(`databases/${this.DBName}.json`);
            let content = JSON.parse(getFileContent.toString());
            if (key in content) {
                delete content[key];
            }
            return await fs.writeFile(`databases/${this.DBName}.json`, JSON.stringify(content, null, 0), "utf-8");
        }
        catch {
            return;
        }
    }
    ;
    async get(key) {
        try {
            const getFileContent = await fs.readFile(`databases/${this.DBName}.json`);
            let content = JSON.parse(getFileContent.toString());
            if (key in content) {
                return Object.values(content[key]);
            }
        }
        catch {
            return undefined;
        }
    }
    async set(key, value) {
        try {
            const getFileContent = await fs.readFile(`databases/${this.DBName}.json`);
            let content = JSON.parse(getFileContent.toString());
            content = { ...content, [key]: value };
            if (Array.isArray(content[key]))
                content[key] = content[key].flat();
            await fs.writeFile(`databases/${this.DBName}.json`, JSON.stringify(content, null, 0), "utf-8");
        }
        catch {
            return await fs.writeFile(`databases/${this.DBName}.json`, JSON.stringify({ [key]: value }, null, 0), "utf-8");
        }
    }
}
