import { BaseObject } from "../data/BaseObject";

export abstract class Bricklet extends BaseObject {
        public uid: string;
        public brickMasterID: string;
}