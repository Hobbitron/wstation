import { BaseObject } from "../data/BaseObject";
import { BaseReport } from "../reports/baseReport"
import { Bricklet } from "./Bricklet"

export class BrickletBarometer extends Bricklet {
    public brickletBarometerID: string;
    private reports;
    public generateInsertStatement(): string {
        var statement = "";        
        statement += "INSERT INTO brickletBarometer VALUES ('";
        statement += this.brickletBarometerID + "',";        
        statement += "'" + this.brickMasterID + "',";
        statement += "'" + this.uid + "'";
        statement += ")";
        return statement;
    }
    public generateUpdateStatement(): string {
        var statement = "";
        statement += "UPDATE brickletBarometer SET ";
        statement += "uid = '" + this.uid + "',";
        statement += "brickMasterID = '" + this.brickMasterID + "',";
        statement += "where brickletBarometer = '" + this.brickletBarometerID + "'";
        return statement;
    }
    public generateDeleteStatement(): string {
        var statement = "";
        statement += "DELETE FROM brickletBarometer WHERE brickletBarometerID = '" + this.brickletBarometerID + "'";
        return statement;
    }
    public generateGetByIDStatement(): string {
        var statement = "";
        statement += "SELECT * FROM brickletBarometer WHERE brickletBarometerID = '" + this.brickletBarometerID + "'";        
        return statement;
    }
    public setPrimaryKey() {
        this.brickletBarometerID = this.generateUUID();
    }
    protected setData(row: any) {
        this.brickletBarometerID = row.brickletBarometerID;    
        this.uid = row.uid;
        this.brickMasterID = row.brickMasterID;
    }
    protected getData(): any {
        var data: any = {};
        data.brickletBarometerID = this.brickletBarometerID;     
        data.uid = this.uid;
        data.brickMasterID = this.brickMasterID;
        return data;
    }
    public getDatabaseName(): string {
        return "brickletBarometer.db";
    }
    public getDatabaseSchemaStatement(): string {
        return "CREATE TABLE brickletBarometer (brickletBarometerID TEXT, brickMasterID TEXT,  uid TEXT)";
    }
    public generateGetByParentIDStatement(id: string): string {
        return "SELECT * FROM brickletBarometer where brickMasterID = '" + this.brickMasterID + "'";
    }
}