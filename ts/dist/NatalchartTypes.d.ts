export interface ApiPro {
    activity?: string;
    birth: Record<string, any>;
    focus?: any[];
    from?: string;
    limit?: number;
    location: Record<string, any>;
    personA: Record<string, any>;
    personB: Record<string, any>;
    region?: string;
    timezone?: string;
    to?: string;
    year: number;
}
export interface ApiProCreateData {
    activity?: string;
    birth: Record<string, any>;
    focus?: any[];
    from?: string;
    limit?: number;
    location?: Record<string, any>;
    personA: Record<string, any>;
    personB: Record<string, any>;
    region?: string;
    timezone?: string;
    to?: string;
    year: number;
}
export interface FreeAndPro {
    birth: Record<string, any>;
    date?: string;
}
export interface FreeAndProLoadMatch {
    date?: string;
}
export interface FreeAndProCreateData {
    birth: Record<string, any>;
    date?: string;
}
