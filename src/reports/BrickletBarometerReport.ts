import { BaseReport } from "./BaseReport";

export class BrickletBarometerReport extends BaseReport {
    public airPressure: number;
    public brickletBarometerID: string;
    public brickletBarometerReportID: string;
    public generateInsertStatement(): string {
        var statement = "";        
        statement += "INSERT INTO brickletBarometerReport VALUES ('";
        statement += this.brickletBarometerReportID + "',";
        statement += "'" + this.brickletBarometerID + "',";
        statement += this.airPressure;
        statement += ")";
        return statement;
    }
    public generateUpdateStatement(): string {
        var statement = "";
        statement += "UPDATE brickletBarometerReport SET ";
        statement += "brickletBarometerID = '" + this.brickletBarometerID + "',";
        statement += "airPressure = " + this.airPressure + ",";
        statement += "where brickletBarometerReportID = '" + this.brickletBarometerReportID + "'";
        return statement;
    }
    public generateDeleteStatement(): string {
        var statement = "";
        statement += "DELETE FROM brickletBarometerReport WHERE brickletBarometerReportID = '" + this.brickletBarometerReportID + "'";
        return statement;
    }
    public generateGetByIDStatement(): string {
        var statement = "";
        statement += "SELECT * FROM brickletBarometerReport WHERE brickletBarometerReportID = '" + this.brickletBarometerReportID + "'";        
        return statement;
    }
    public setPrimaryKey() {
        this.brickletBarometerReportID = this.generateUUID();
    }
    protected setData(row: any) {
        this.brickletBarometerReportID = row.brickletBarometerReportID;    
        this.brickletBarometerID = row.brickletBarometerID;
        this.airPressure = row.airPressure;
    }
    protected getData(): any {
        var data: any = {};
        data.brickletBarometerReportID = this.brickletBarometerReportID;     
        data.brickletBarometerID = this.brickletBarometerID;
        data.airPressure = this.airPressure;
        return data;
    }
    public getDatabaseName(): string {
        return "brickletBarometerReport.db";
    }
    public getDatabaseSchemaStatement(): string {
        return "CREATE TABLE brickletBarometerReport (brickletBarometerReportID TEXT, brickletBarometerID TEXT, airPressure REAL)";
    }
    public generateGetByParentIDStatement(id: string): string {
        return "SELECT * FROM brickletBarometerReport where brickletBarometerReportID = '" + this.brickletBarometerReportID + "'";
    }
}