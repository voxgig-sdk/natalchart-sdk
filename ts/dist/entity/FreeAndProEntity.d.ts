import { NatalchartEntityBase } from '../NatalchartEntityBase';
import type { NatalchartSDK } from '../NatalchartSDK';
import type { Control } from '../types';
import type { FreeAndPro, FreeAndProLoadMatch, FreeAndProCreateData } from '../NatalchartTypes';
declare class FreeAndProEntity extends NatalchartEntityBase<FreeAndPro> {
    constructor(client: NatalchartSDK, entopts: any);
    make(this: FreeAndProEntity): FreeAndProEntity;
    load(this: any, reqmatch?: FreeAndProLoadMatch, ctrl?: Control): Promise<FreeAndProEntity>;
    create(this: any, reqdata?: FreeAndProCreateData, ctrl?: Control): Promise<FreeAndProEntity>;
}
export { FreeAndProEntity };
