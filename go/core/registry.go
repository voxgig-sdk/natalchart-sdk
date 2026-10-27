package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewApiProEntityFunc func(client *NatalchartSDK, entopts map[string]any) NatalchartEntity

var NewFreeAndProEntityFunc func(client *NatalchartSDK, entopts map[string]any) NatalchartEntity

