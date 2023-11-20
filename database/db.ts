import { DB } from "../deps.ts";

// Initialize and open the SQLite database
const db = new DB("./database.db");

// Create the table if it doesn't exist
db.query(`
    CREATE TABLE IF NOT EXISTS names (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    );
`);

// Function to save a name to the database
export function saveNameToDatabase(name: string): void {
    db.query("INSERT INTO names (name) VALUES (?);", [name]);
}

// Function to get all names from the database
export async function getAllNamesFromDatabase(): Promise<string[]> {
    const results = [];
    for (const [name] of db.query("SELECT name FROM names;")) {
        results.push(name);
    }
    return results;
}

// Function to close the database (can be called when the application is closing)
export function closeDb() {
    db.close();
}

// Ensure to close the database when the application is closing
window.addEventListener("unload", () => {
    closeDb();
});

