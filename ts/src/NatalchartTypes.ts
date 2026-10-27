// Typed models for the Natalchart SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface ApiPro {
  activity?: string
  birth: Record<string, any>
  focus?: any[]
  from?: string
  limit?: number
  location: Record<string, any>
  personA: Record<string, any>
  personB: Record<string, any>
  region?: string
  timezone?: string
  to?: string
  year: number
}

export interface ApiProCreateData {
  activity?: string
  birth: Record<string, any>
  focus?: any[]
  from?: string
  limit?: number
  location?: Record<string, any>
  personA: Record<string, any>
  personB: Record<string, any>
  region?: string
  timezone?: string
  to?: string
  year: number
}

export interface FreeAndPro {
  birth: Record<string, any>
  date?: string
}

export interface FreeAndProLoadMatch {
  date?: string
}

export interface FreeAndProCreateData {
  birth: Record<string, any>
  date?: string
}

