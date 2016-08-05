import { BaseObject } from "../data/BaseObject";
import { BaseReport } from "../reports/baseReport";
import { Bricklet } from "./Bricklet";

export class BrickletHumidity extends Bricklet {
    public brickletHumidityID: string;   
    private reports;
    public generateInsertStatement(): string {
        var statement = "";        
        statement += "INSERT INTO brickletHumidity VALUES ('";
        statement += this.brickletHumidityID + "',";
        statement += "'" + this.brickMasterID + "',";
        statement += "'" + this.uid + "'";
        statement += ")";
        return statement;
    }
    public generateUpdateStatement(): string {
        var statement = "";
        statement += "UPDATE brickletHumidity SET ";
        statement += "uid = '" + this.uid + "',";
        statement += "brickMasterID = '" + this.brickMasterID + "',";
        statement += "where brickletHumidity = '" + this.brickletHumidityID + "'";
        return statement;
    }
    public generateDeleteStatement(): string {
        var statement = "";
        statement += "DELETE FROM brickletHumidity WHERE brickletHumidityID = '" + this.brickletHumidityID + "'";
        return statement;
    }
    public generateGetByIDStatement(): string {
        var statement = "";
        statement += "SELECT * FROM brickletHumidity WHERE brickletHumidityID = '" + this.brickletHumidityID + "'";        
        return statement;
    }
    public setPrimaryKey() {
        this.brickletHumidityID = this.generateUUID();
    }
    protected setData(row: any) {
        this.brickletHumidityID = row.brickletHumidityID;    
        this.uid = row.uid;
        this.brickMasterID = row.brickMasterID;
    }
    protected getData(): any {
        var data: any = {};
        data.brickletHumidityID = this.brickletHumidityID;     
        data.uid = this.uid;
        data.brickMasterID = this.brickMasterID;
        return data;
    }
    public getDatabaseName(): string {
        return "brickletHumidity.db";
    }
    public getDatabaseSchemaStatement(): string {
        return "CREATE TABLE brickletHumidity (brickletHumidityID TEXT, brickMasterID TEXT, uid TEXT)";
    }
    public generateGetByParentIDStatement(id: string): string {
        return "SELECT * FROM brickletHumidity where brickMasterID = '" + this.brickMasterID + "'";
    }
}