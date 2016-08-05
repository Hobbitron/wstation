import { BaseObject } from "../data/BaseObject";
import { BaseReport } from "../reports/baseReport";
import { Bricklet } from "./Bricklet";

export class BrickMaster extends Bricklet {    
    public uid: string;
    public ipAddress: string;
    public port: number;    
    public generateInsertStatement(): string {
        var statement = "";        
        statement += "INSERT INTO brickMaster VALUES ('";
        statement += this.brickMasterID + "'" + ",";
        statement += "uid = '" + this.uid + "',";
        statement += "ipAddress = '" + this.ipAddress + "',";
        statement += "port = " + this.port + ",";
        statement += ")";
        return statement;
    }
    public generateUpdateStatement(): string {
        var statement = "";
        statement += "UPDATE brickMaster SET ";
        statement += "uid = '" + this.uid + "',";
        statement += "ipAddress = '" + this.ipAddress + "',";
        statement += "port = " + this.port + ",";
        statement += "where brickMaster = '" + this.brickMasterID + "'";
        return statement;
    }
    public generateDeleteStatement(): string {
        var statement = "";
        statement += "DELETE FROM brickMaster WHERE brickMasterID = '" + this.brickMasterID + "'";
        return statement;
    }
    public generateGetByIDStatement(): string {
        var statement = "";
        statement += "SELECT * FROM brickMaster WHERE brickMasterID = '" + this.brickMasterID + "'";        
        return statement;
    }
    public setPrimaryKey() {
        this.brickMasterID = this.generateUUID();
    }
    protected setData(row: any) {
        this.brickMasterID = row.brickMasterID;    
        this.uid = row.uid;
        this.ipAddress = row.ipAddress;
        this.port = row.port;
    }
    protected getData(): any {
        var data: any = {};
        data.brickMasterID = this.brickMasterID;     
                data.uid = this.uid;
        data.ipAddress = this.ipAddress;
        data.port = this.port;
        return data;
    }
    public getDatabaseName(): string {
        return "brickMaster.db";
    }
    public getDatabaseSchemaStatement(): string {
        return "CREATE TABLE brickMaster (brickMasterID TEXT, ipAddress TEXT, port INTEGER, uid TEXT)";
    }
    public generateGetByParentIDStatement(id: string): string {
        return "";
    }
}