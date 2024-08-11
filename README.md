# ✨ yuit.db
This project is a database that works on 2 systems, classic and Collection, with JSON format. You can understand by seeing the examples below, but you need to install it first!
# 📦 Installation
```shell
npm i yuit.db
```

# 🧠 Example's (CollectionDB)
```js
import { CollectionDB } from "yuit.db";

const db = new CollectionDB("usersCollection");

await db.insert([
    {username: "Yusuf", email: "example1.com", password: "09876543210"},
    {username: "Eren", email: "example2.com", password: "91873017401"},
]);

const myDatabase = await db.findAll()
console.log(myDatabase);
/* [
    {username: "Yusuf", email: "example1.com", password: "09876543210"},
    {username: "Eren", email: "example2.com", password: "91873017401"},
] */
await db.update({email: "example2.com"}, {username: "Yunus"});
// Eren to Yunus
await db.findOneAndDeleteAll({email: "example2.com"})
// Yunus is deleted.

const getUserInfo = await db.find({username: "Yusuf", /* blablabla */})
console.log(getUserInfo)
/*    {username: "Yusuf", email: "example1.com", password: "09876543210"},
*/

await db.deleteAll() // delete "userCollection"
```

# 🧠 Example (ClassicDB)
```js
import { ClassicDB } from "yuit.db";
const db = new ClassicDB("users");

await db.set("user", {
{age: 19, name: "Cevhet"}
});
// {age:19, name:"Cevhet"}
await db.delete("user");
// {}
await db.add("userCount", 1)
// {userCount: 1}
await db.add("userCount", 1)
// {userCount: 2}
await db.substr("userCount", 5)
// {userCount: -3}
await db.push("games", [
    {name: "Minecraft"},
    {name: "Valorant"},
    {name: "League of Legends"},
])
 // {games: {games: [{name: "Minecraft" blablabla}]}
 await db.pull("games", {name: "Minecraft"})
 // delete Minecraft.
 const games = await db.get("games")
 console.log(games)
 /*
 { games: [
    {name: "Minecraft"},
    {name: "Valorant"},
    {name: "League of Legends"},
] }
 */
```

# 🧬 Credits
This module was developed by Yunus Emre GÜN. If you have any problems, just contact me from the link below.

<a>https://yunusedev.vercel.app</a>