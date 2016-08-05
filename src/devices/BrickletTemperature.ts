import { BaseObject } from "../data/BaseObject";
import { BaseReport } from "../reports/baseReport"
import { Bricklet } from "./Bricklet"
import { BrickletTemperatureReport } from "../reports/BrickletTemperatureReport";

export class BrickletTemperature 
extends Bricklet {
    private brickletTemperatureID;
    private reports;
    public generateInsertStatement(): string {
        var statement = "";        
        statement += "INSERT INTO brickletTemperature VALUES ('";
        statement += this.brickletTemperatureID + "',";
        statement += "'" + this.brickMasterID + "'," 
        statement += "'" + this.uid + "'";
        statement += ")";
        return statement;
    }
    public generateUpdateStatement(): string {
        var statement = "";
        statement += "UPDATE brickletTemperature SET ";
        statement += "brickletTemperatureID = '" + this.brickMasterID + "',";
        statement += "uid = '" + this.uid + "',";        
        statement += "where brickletTemperature = '" + this.brickletTemperatureID + "'";
        return statement;
    }
    public generateDeleteStatement(): string {
        var statement = "";
        statement += "DELETE FROM brickletTemperature WHERE brickletTemperatureID = '" + this.brickletTemperatureID + "'";
        return statement;
    }
    public generateGetByIDStatement(): string {
        var statement = "";
        statement += "SELECT * FROM brickletTemperature WHERE brickletTemperatureID = '" + this.brickletTemperatureID + "'";        
        return statement;
    }
    public setPrimaryKey() {
        this.brickletTemperatureID = this.generateUUID();
    }
    protected setData(row: any) {
        this.brickletTemperatureID = row.brickletTemperatureID;    
        this.brickMasterID = row.brickMasterID;
        this.uid = row.uid;
    }
    protected getData(): any {
        var data: any = {};
        data.brickletTemperatureID = this.brickletTemperatureID;
        data.brickMasterID = this.brickMasterID;     
        data.uid = this.uid;
        return data;
    }
    public getDatabaseName(): string {
        return "brickletTemperature.db";
    }
    public getDatabaseSchemaStatement(): string {
        return "CREATE TABLE brickletTemperature (brickletTemperatureID TEXT, brickMasterID TEXT, uid TEXT)";
    }
    public generateGetByParentIDStatement(id: string): string {
        return "SELECT * FROM brickletTemperature where brickMasterID = '" + this.brickMasterID + "'";
    }
}