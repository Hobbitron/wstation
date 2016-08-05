import { BaseObject } from "../data/BaseObject";
import { WeatherStationReport } from "./weatherstationreport"

export class WeatherStation extends BaseObject {
    public weatherStationID: string;
    public get reports(): Array<WeatherStationReport> {

    };
    public generateInsertStatement(): string {
        var statement = "";        
        statement += "INSERT INTO WeatherStation VALUES ('";
        statement += this.weatherStationID + "'" + ",";
        statement += ")";
        return statement;
    }
    public generateUpdateStatement(): string {
        var statement = "";
        statement += "UPDATE WeatherStation SET ";
        statement += "where weatherStationID = '" + this.weatherStationID + "'";
        return statement;
    }
    public generateDeleteStatement(): string {
        var statement = "";
        statement += "DELETE FROM weatherStation WHERE WeatherStationID = '" + this.weatherStationID + "'";
        return statement;
    }
    public generateGetByIDStatement(): string {
        var statement = "";
        statement += "SELECT * FROM weatherStation WHERE WeatherStationID = '" + this.weatherStationID + "'";        
        return statement;
    }
    public setPrimaryKey() {
        this.weatherStationID = this.generateUUID();
    }
    protected setData(row: any) {
        this.weatherStationID = row.weatherStationID;     
    }
    protected getData(): any {
        var data: any = {};
        data.weatherStationID = this.weatherStationID;     
        return data;
    }
    public getDatabaseName(): string {
        return "weatherStation.db";
    }
    public getDatabaseSchemaStatement(): string {
        return "CREATE TABLE weatherStation (weatherStationID TEXT, airPressure REAL, altitude REAL, humidity REAL, stackVoltage REAL, stackCurrent REAL, temperature INTEGER)";
    }
    public generateGetByParentIDStatement(id: string): string {
        return "";
    }
}