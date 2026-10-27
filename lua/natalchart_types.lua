-- Typed models for the Natalchart SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class ApiPro
---@field activity? string
---@field birth table
---@field focus? table
---@field from? string
---@field limit? number
---@field location table
---@field personA table
---@field personB table
---@field region? string
---@field timezone? string
---@field to? string
---@field year number

---@class ApiProCreateData
---@field activity? string
---@field birth table
---@field focus? table
---@field from? string
---@field limit? number
---@field location? table
---@field personA table
---@field personB table
---@field region? string
---@field timezone? string
---@field to? string
---@field year number

---@class FreeAndPro
---@field birth table
---@field date? string

---@class FreeAndProLoadMatch
---@field date? string

---@class FreeAndProCreateData
---@field birth table
---@field date? string

local M = {}

return M
