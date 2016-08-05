import { BaseReport } from "./BaseReport";

export class BrickletHumidityReport extends BaseReport {
    public humidity: number;
    public brickletHumidityID: string;
    public brickletHumidityReportID: string;
    public generateInsertStatement(): string {
        var statement = "";        
        statement += "INSERT INTO brickletTemperatureReport VALUES ('";
        statement += this.brickletHumidityReportID + "',";
        statement += "'" + this.brickletHumidityID + "',";
        statement += this.humidity + ",";
        statement += ")";
        return statement;
    }
    public generateUpdateStatement(): string {
        var statement = "";
        statement += "UPDATE brickletTemperatureReport SET ";
        statement += "brickletHumidityID = '" + this.brickletHumidityID + "',";
        statement += "humidity = " + this.humidity + ",";
        statement += "where brickletHumidityReportID = '" + this.brickletHumidityReportID + "'";
        return statement;
    }
    public generateDeleteStatement(): string {
        var statement = "";
        statement += "DELETE FROM brickletTemperatureReport WHERE brickletHumidityReportID = '" + this.brickletHumidityReportID + "'";
        return statement;
    }
    public generateGetByIDStatement(): string {
        var statement = "";
        statement += "SELECT * FROM brickletTemperatureReport WHERE brickletHumidityReportID = '" + this.brickletHumidityReportID + "'";        
        return statement;
    }
    public setPrimaryKey() {
        this.brickletHumidityReportID = this.generateUUID();
    }
    protected setData(row: any) {
        this.brickletHumidityReportID = row.brickletHumidityReportID;    
        this.brickletHumidityID = row.brickletHumidityID;
        this.humidity = row.humidity;
    }
    protected getData(): any {
        var data: any = {};
        data.brickletHumidityReportID = this.brickletHumidityReportID;     
        data.brickletHumidityID = this.brickletHumidityID;
        data.humidity = this.humidity;
        return data;
    }
    public getDatabaseName(): string {
        return "brickletHumidityReport.db";
    }
    public getDatabaseSchemaStatement(): string {
        return "CREATE TABLE brickletHumidityReport (brickletHumidityReportID TEXT, brickletHumidityID TEXT, humidity INTEGER)";
    }
    public generateGetByParentIDStatement(id: string): string {
        return "SELECT * FROM brickletHumidityReport where brickletHumidityReportID = '" + this.brickletHumidityReportID + "'";
    }
}