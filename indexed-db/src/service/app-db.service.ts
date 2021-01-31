import { openDB, IDBPDatabase } from 'idb'

export const db = (name: string): Promise<IDBPDatabase> => {
    return new Promise((res, rej) => {
        const appDb: Promise<IDBPDatabase> = openDB(name, 1, {
            upgrade: (db, oldVersion, newVersion, transaction) => {
                db.createObjectStore('userDetails');
                db.createObjectStore('blogStore');
            }
        })
        appDb.then(db => {
            res(db)
        })
    });
}