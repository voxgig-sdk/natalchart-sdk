# frozen_string_literal: true

# Typed models for the Natalchart SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# ApiPro entity data model.
#
# @!attribute [rw] activity
#   @return [String, nil]
#
# @!attribute [rw] birth
#   @return [Hash]
#
# @!attribute [rw] focus
#   @return [Array, nil]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] location
#   @return [Hash]
#
# @!attribute [rw] personA
#   @return [Hash]
#
# @!attribute [rw] personB
#   @return [Hash]
#
# @!attribute [rw] region
#   @return [String, nil]
#
# @!attribute [rw] timezone
#   @return [String, nil]
#
# @!attribute [rw] to
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Integer]
ApiPro = Struct.new(
  :activity,
  :birth,
  :focus,
  :from,
  :limit,
  :location,
  :personA,
  :personB,
  :region,
  :timezone,
  :to,
  :year,
  keyword_init: true
)

# Request payload for ApiPro#create.
#
# @!attribute [rw] activity
#   @return [String, nil]
#
# @!attribute [rw] birth
#   @return [Hash]
#
# @!attribute [rw] focus
#   @return [Array, nil]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] location
#   @return [Hash, nil]
#
# @!attribute [rw] personA
#   @return [Hash]
#
# @!attribute [rw] personB
#   @return [Hash]
#
# @!attribute [rw] region
#   @return [String, nil]
#
# @!attribute [rw] timezone
#   @return [String, nil]
#
# @!attribute [rw] to
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Integer]
ApiProCreateData = Struct.new(
  :activity,
  :birth,
  :focus,
  :from,
  :limit,
  :location,
  :personA,
  :personB,
  :region,
  :timezone,
  :to,
  :year,
  keyword_init: true
)

# FreeAndPro entity data model.
#
# @!attribute [rw] birth
#   @return [Hash]
#
# @!attribute [rw] date
#   @return [String, nil]
FreeAndPro = Struct.new(
  :birth,
  :date,
  keyword_init: true
)

# Request payload for FreeAndPro#load.
#
# @!attribute [rw] date
#   @return [String, nil]
FreeAndProLoadMatch = Struct.new(
  :date,
  keyword_init: true
)

# Request payload for FreeAndPro#create.
#
# @!attribute [rw] birth
#   @return [Hash]
#
# @!attribute [rw] date
#   @return [String, nil]
FreeAndProCreateData = Struct.new(
  :birth,
  :date,
  keyword_init: true
)

