import fs from "node:fs/promises";

export class ClassicDB {
    DBName:string
    constructor (DBName:string) {
        this.DBName = DBName
    };
    async add(key:string, value:number) {
        try {
            const getFileContent = await fs.readFile(`databases/${this.DBName}.json`);
            let content: Record<string,any> = JSON.parse(getFileContent.toString());
            if(typeof value != "number") throw new Error(`${value} || Is not number! is ${typeof value}`)
            if(key in content) {
                content[key] += value
            } else {
                content = {...content, [key]:value}
            };
            await fs.writeFile(`databases/${this.DBName}.json`, JSON.stringify(content,null, 0), "utf-8")
        } catch {
            return console.error("First db.set() method or add value's is \"not number\"!");
        }
    }
    async substr(key:string, value:number) {
        try {
            const getFileContent = await fs.readFile(`databases/${this.DBName}.json`);
            let content: Record<string,any> = JSON.parse(getFileContent.toString());
            if(typeof value != "number") throw new Error(`${value} || Is not number! is ${typeof value}`)
            if(key in content) {
                content[key] -= value
            } else {
                content = {...content, [key]:value}
            };
            await fs.writeFile(`databases/${this.DBName}.json`, JSON.stringify(content,null, 0), "utf-8")
        } catch {
            return console.error("First db.set() method or add value's is \"not number\"!");
        }
    }
    async pull(key:string, value:any): Promise<void> {
        try {
            const getFileContent = await fs.readFile(`databases/${this.DBName}.json`);
            let content: Record<string,any> = JSON.parse(getFileContent.toString());
            if(key in content) {
                if(Array.isArray(content[key])) {
                    content[key] = content[key].filter(item => !this.isObjectEqual(item, value))
                }
            }
            await fs.writeFile(`databases/${this.DBName}.json`, JSON.stringify(content,null,0), "utf-8")
        } catch {
            return;
        }
    }
    private isObjectEqual(item: any, value: any): boolean {
        return Object.keys(value).some(key => item[key] === value[key]);
    }
    async push(key: string, value:any): Promise<void> {
        try {
            const getFileContent = await fs.readFile(`databases/${this.DBName}.json`);
            let content: Record<string,any> = JSON.parse(getFileContent.toString());
            if(key in content) {
               if(!Array.isArray(content[key])) {
                content[key] = [content[key]]
               }
               content[key].push(value)
            } else {
                content[key] = [value]
            }
            content[key] = content[key].flat()
            await fs.writeFile(`databases/${this.DBName}.json`, JSON.stringify(content, null, 0), "utf-8")
        } catch(err) {
            return console.error(err);
        }
    }
    async delete(key:string): Promise<void> {
        try {
            const getFileContent = await fs.readFile(`databases/${this.DBName}.json`);
            let content: Record<string,any> = JSON.parse(getFileContent.toString());
            if(key in content) {
                delete content[key];
            }
            return await fs.writeFile(`databases/${this.DBName}.json`, JSON.stringify(content, null, 0), "utf-8");
        } catch {
            return;
        }
    };
    async get(key:string): Promise<any> {
        try {
            const getFileContent = await fs.readFile(`databases/${this.DBName}.json`);
            let content: Record<string,any> = JSON.parse(getFileContent.toString());
            if(key in content) {
                return Object.values(content[key])
            }
        } catch {
            return undefined;
        }
    }
   async set(key:string, value:any): Promise<void> {
        try {
            const getFileContent = await fs.readFile(`databases/${this.DBName}.json`);
            let content:Record<string,any> = JSON.parse(getFileContent.toString());
            content = {...content, [key]:value}

            if(Array.isArray(content[key])) content[key] = content[key].flat()
            await fs.writeFile(`databases/${this.DBName}.json`, JSON.stringify(content, null, 0), "utf-8")
        } catch {
            return await fs.writeFile(`databases/${this.DBName}.json`, JSON.stringify({[key]:value}, null, 0), "utf-8")
        }
    }
}