import { NatalchartEntityBase } from '../NatalchartEntityBase';
import type { NatalchartSDK } from '../NatalchartSDK';
import type { Control } from '../types';
import type { ApiPro, ApiProCreateData } from '../NatalchartTypes';
declare class ApiProEntity extends NatalchartEntityBase<ApiPro> {
    constructor(client: NatalchartSDK, entopts: any);
    make(this: ApiProEntity): ApiProEntity;
    create(this: any, reqdata?: ApiProCreateData, ctrl?: Control): Promise<ApiProEntity>;
}
export { ApiProEntity };
