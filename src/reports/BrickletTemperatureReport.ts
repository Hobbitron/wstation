import { BaseReport } from "./BaseReport";

export class BrickletTemperatureReport extends BaseReport {
    public temperature: number;
    public brickletTemperatureID: string;
    public brickletTemperatureReportID: string;
    public generateInsertStatement(): string {
        var statement = "";        
        statement += "INSERT INTO brickletTemperatureReport VALUES ('";
        statement += this.brickletTemperatureReportID + "',";
        statement += "'" + this.brickletTemperatureID + "',";
        statement += this.temperature + ",";
        statement += ")";
        return statement;
    }
    public generateUpdateStatement(): string {
        var statement = "";
        statement += "UPDATE brickletTemperatureReport SET ";
        statement += "brickletTemperatureID = '" + this.brickletTemperatureID + "',";
        statement += "temperature = " + this.temperature + ",";
        statement += "where brickletTemperatureReport = '" + this.brickletTemperatureReportID + "'";
        return statement;
    }
    public generateDeleteStatement(): string {
        var statement = "";
        statement += "DELETE FROM brickletTemperatureReport WHERE brickletTemperatureReportID = '" + this.brickletTemperatureReportID + "'";
        return statement;
    }
    public generateGetByIDStatement(): string {
        var statement = "";
        statement += "SELECT * FROM brickletTemperatureReport WHERE brickletTemperatureReportID = '" + this.brickletTemperatureReportID + "'";        
        return statement;
    }
    public setPrimaryKey() {
        this.brickletTemperatureReportID = this.generateUUID();
    }
    protected setData(row: any) {
        this.brickletTemperatureReportID = row.brickletTemperatureReportID;    
        this.brickletTemperatureID = row.brickletTemperatureID;
        this.brickletTemperatureReportID = row.brickletTemperatureReportID;
    }
    protected getData(): any {
        var data: any = {};
        data.brickletTemperatureReportID = this.brickletTemperatureReportID;     
        data.brickletTemperatureID = this.brickletTemperatureID;
        data.brickletTemperatureReportID = this.brickletTemperatureReportID;
        return data;
    }
    public getDatabaseName(): string {
        return "brickletTemperatureReport.db";
    }
    public getDatabaseSchemaStatement(): string {
        return "CREATE TABLE brickletTemperatureReport (brickletTemperatureReportID TEXT, brickletTemperatureID TEXT, temperature INTEGER)";
    }
    public generateGetByParentIDStatement(id: string): string {
        return "SELECT * FROM brickletTemperatureReport where brickletTemperatureID = '" + this.brickletTemperatureID + "'";
    }
}