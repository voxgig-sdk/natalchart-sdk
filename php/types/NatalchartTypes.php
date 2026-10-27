<?php
declare(strict_types=1);

// Typed models for the Natalchart SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** ApiPro entity data model. */
class ApiPro
{
    public ?string $activity = null;
    public array $birth;
    public ?array $focus = null;
    public ?string $from = null;
    public ?int $limit = null;
    public array $location;
    public array $personA;
    public array $personB;
    public ?string $region = null;
    public ?string $timezone = null;
    public ?string $to = null;
    public int $year;
}

/** Request payload for ApiPro#create. */
class ApiProCreateData
{
    public ?string $activity = null;
    public array $birth;
    public ?array $focus = null;
    public ?string $from = null;
    public ?int $limit = null;
    public ?array $location = null;
    public array $personA;
    public array $personB;
    public ?string $region = null;
    public ?string $timezone = null;
    public ?string $to = null;
    public int $year;
}

/** FreeAndPro entity data model. */
class FreeAndPro
{
    public array $birth;
    public ?string $date = null;
}

/** Request payload for FreeAndPro#load. */
class FreeAndProLoadMatch
{
    public ?string $date = null;
}

/** Request payload for FreeAndPro#create. */
class FreeAndProCreateData
{
    public array $birth;
    public ?string $date = null;
}

