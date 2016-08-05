/// <reference path="../../typings/index.d.ts" />

import fs = require('fs');
var sqlite3 = require("sqlite3").verbose();

import Database = require('sqlite3');

export abstract class BaseObject {
    protected generateUUID(): string {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
    private isNew: boolean = true;
    public save(callback: Function) {        
        var file = this.getDatabaseName();
        var exists = fs.existsSync(file);
        var db = new sqlite3.Database(file);
        if (!exists) {
            this.createDatabase(db);
        }        
        db.serialize(() => {
            var stmt;
            if (this.isNew) {                
                this.setPrimaryKey();
                var s = this.generateInsertStatement();
                console.log(s);
                stmt = db.prepare(this.generateInsertStatement());
            } else {
                stmt = db.prepare(this.generateUpdateStatement());
            }
            stmt.run((err) => {
                db.get(this.generateGetByIDStatement(), (err, row) => {
                    console.log("get done");                
                    if (err) {
                        throw err;
                    } else {
                        this.setData(row);
                        this.isNew = false;
                    }
                    callback();
                });                
            });
            stmt.finalize();            
            // var stmt = db.prepare(this.generateGetByIDStatement(), (err, row) => {
            //     console.log("get done");                
            //     if (err) {
            //         throw err;
            //     } else {
            //         this.setData(row);
            //         this.isNew = false;
            //     }
            // })
            
            // console.log("write done");                                   
        });   
    }

    public load(id: string, callback: Function) {
        var file = this.getDatabaseName();
        var exists = fs.existsSync(file);
        var db = new sqlite3.Database(file);
        if (!exists) {
            this.createDatabase(db);
        }   
        db.serialize(() => {            
            db.get(this.generateGetByIDStatement(), (err, row) => {                
                if (err) {
                    throw err;
                } else {
                    if (row) {
                        this.setData(row);
                        this.isNew = false;
                    }
                }
                callback();
            })
            db.close();
        })
    }

    public loadByParentID(id: string, callback: Function, childObj: any) {
        var file = this.getDatabaseName();
        var exists = fs.existsSync(file);
        var db = new sqlite3.Database(file);
        if (!exists) {
            this.createDatabase(db);
        }
        var results = new Array<any>();
        db.serialize(() => {            
            db.each(this.generateGetByParentIDStatement(id), (err, row) => {                
                if (err) {
                    throw err;
                } else {
                    if (row) {
                        var child = new childObj();
                        child.setData(row);             
                        results.push(child);           
                    }
                }
                callback(results);
            })
            db.close();
        })
    }

    private createDatabase(db: Database.Database) {
        db.serialize(() => {
            db.run(this.getDatabaseSchemaStatement());
            db.close();
        })        
    }
    abstract getDatabaseSchemaStatement(): string;
    abstract generateInsertStatement(): string;
    abstract generateUpdateStatement(): string;
    abstract generateDeleteStatement(): string;
    abstract generateGetByIDStatement(): string;
    abstract generateGetByParentIDStatement(id: string): string;
    abstract getDatabaseName(): string;    
    protected abstract setData(row: any);
    protected abstract getData(): any;
    abstract setPrimaryKey();
    public setJson(jObject: any) {
        this.setData(jObject);
    }
    public getJson(): any {
        console.log(this.getData());
        return this.getData();
    }
}