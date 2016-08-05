import { BaseObject } from "../data/BaseObject";
import { BaseReport } from "./BaseReport";

export class BrickMasterReport extends BaseReport {
    public airPressure: number;
    public altitude: number;
    public humidity: number;
    public stackVoltage: number;
    public stackCurrent: number;
    public temperature: number;
    public weatherStationID: string;
    public brickMasterReportID: string;
    public generateInsertStatement(): string {
        var statement = "";        
        statement += "INSERT INTO brickMasterReport VALUES ('";
        statement += this.brickMasterReportID + "'" + ",";
        statement += this.airPressure.toString() + ",";
        statement += this.altitude.toString() + ",";
        statement += this.humidity.toString() + ",";
        statement += this.stackVoltage.toString() + ",";
        statement += this.stackCurrent.toString() + ",";
        statement += this.temperature.toString();
        statement += ")";
        return statement;
    }
    public generateUpdateStatement(): string {
        var statement = "";
        statement += "UPDATE brickMasterReport SET ";
        statement += "airPressure = " + this.airPressure.toString() + ",";
        statement += "altitude = " + this.altitude.toString() + ",";
        statement += "humidity = " + this.humidity.toString() + ",";
        statement += "stackVoltage = " + this.stackVoltage.toString() + ",";
        statement += "stackCurrent = " + this.stackCurrent.toString() + ",";
        statement += "temperature = " + this.temperature.toString();
        statement += "where brickMasterReportID = '" + this.brickMasterReportID + "'";
        return statement;
    }
    public generateDeleteStatement(): string {
        var statement = "";
        statement += "DELETE FROM brickMasterReport WHERE brickMasterReportID = '" + this.brickMasterReportID + "'";
        return statement;
    }
    public generateGetByIDStatement(): string {
        var statement = "";
        statement += "SELECT * FROM brickMasterReport WHERE brickMasterReportID = '" + this.brickMasterReportID + "'";        
        return statement;
    }
    public setPrimaryKey() {
        this.brickMasterReportID = this.generateUUID();
    }
    protected setData(row: any) {
        this.brickMasterReportID = row.brickMasterReportID;
        this.airPressure = row.airPressure;    
        this.altitude = row.altitude;
        this.humidity = row.humidity;
        this.stackVoltage = row.stackVoltage;
        this.stackCurrent = row.stackCurrent;
        this.temperature = row.temperature;        
    }
    protected getData(): any {
        var data: any = {};
        data.brickMasterReportID = this.brickMasterReportID;
        data.airPressure = this.airPressure;    
        data.altitude = this.altitude;
        data.humidity = this.humidity;
        data.stackVoltage = this.stackVoltage;
        data.stackCurrent = this.stackCurrent;
        data.temperature = this.temperature;      
        return data;
    }
    public getDatabaseName(): string {
        return "brickMasterReport.db";
    }
    public getDatabaseSchemaStatement(): string {
        return "CREATE TABLE brickMasterReport (brickMasterReportID TEXT, airPressure REAL, altitude REAL, humidity REAL, stackVoltage REAL, stackCurrent REAL, temperature INTEGER)";
    }
    public generateGetByParentIDStatement(id: string): string {
        return "SELECT * FROM brickMasterReport WHERE brickMasterReportID = '" + id + "'";
    }
}