import { BaseObject } from "../data/BaseObject";

export class WeatherStationReport extends BaseObject {
    public airPressure: number;
    public altitude: number;
    public humidity: number;
    public stackVoltage: number;
    public stackCurrent: number;
    public temperature: number;
    public weatherStationID: string;
    public weatherStationReportID: string;
    public generateInsertStatement(): string {
        var statement = "";        
        statement += "INSERT INTO WeatherStationReport VALUES ('";
        statement += this.weatherStationReportID + "'" + ",";
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
        statement += "UPDATE WeatherStationReport SET ";
        statement += "airPressure = " + this.airPressure.toString() + ",";
        statement += "altitude = " + this.altitude.toString() + ",";
        statement += "humidity = " + this.humidity.toString() + ",";
        statement += "stackVoltage = " + this.stackVoltage.toString() + ",";
        statement += "stackCurrent = " + this.stackCurrent.toString() + ",";
        statement += "temperature = " + this.temperature.toString();
        statement += "where weatherStationReportID = '" + this.weatherStationReportID + "'";
        return statement;
    }
    public generateDeleteStatement(): string {
        var statement = "";
        statement += "DELETE FROM weatherStationReport WHERE WeatherStationReportID = '" + this.weatherStationReportID + "'";
        return statement;
    }
    public generateGetByIDStatement(): string {
        var statement = "";
        statement += "SELECT * FROM weatherStationReport WHERE WeatherStationReportID = '" + this.weatherStationReportID + "'";        
        return statement;
    }
    public setPrimaryKey() {
        this.weatherStationReportID = this.generateUUID();
    }
    protected setData(row: any) {
        this.weatherStationReportID = row.weatherStationReportID;
        this.airPressure = row.airPressure;    
        this.altitude = row.altitude;
        this.humidity = row.humidity;
        this.stackVoltage = row.stackVoltage;
        this.stackCurrent = row.stackCurrent;
        this.temperature = row.temperature;        
    }
    protected getData(): any {
        var data: any = {};
        data.weatherStationReportID = this.weatherStationReportID;
        data.airPressure = this.airPressure;    
        data.altitude = this.altitude;
        data.humidity = this.humidity;
        data.stackVoltage = this.stackVoltage;
        data.stackCurrent = this.stackCurrent;
        data.temperature = this.temperature;      
        return data;
    }
    public getDatabaseName(): string {
        return "weatherStationReport.db";
    }
    public getDatabaseSchemaStatement(): string {
        return "CREATE TABLE weatherStationReport (weatherStationReportID TEXT, airPressure REAL, altitude REAL, humidity REAL, stackVoltage REAL, stackCurrent REAL, temperature INTEGER)";
    }
    public generateGetByParentIDStatement(id: string): string {
        return "SELECT * FROM weatherStationReport WHERE WeatherStationID = '" + id + "'";
    }
}