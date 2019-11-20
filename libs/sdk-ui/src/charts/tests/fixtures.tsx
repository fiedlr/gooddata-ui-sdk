// (C) 2007-2018 GoodData Corporation
import { dummyBackend } from "@gooddata/sdk-backend-mockingbird";
import { prepareExecution } from "@gooddata/sdk-backend-spi";
import { emptyDef, IMeasure, newMeasure } from "@gooddata/sdk-model";

export const dummyExecution = prepareExecution(dummyBackend(), emptyDef("testWorkspace"));
export const M1: IMeasure = newMeasure("m1", m => m.localId("m1"));
export const M1WithRatio: IMeasure = newMeasure("m1", m => m.localId("m1").ratio());
export const M2: IMeasure = newMeasure("m2", m => m.localId("m2"));
export const M3: IMeasure = newMeasure("m3", m => m.localId("m3"));
export const M4: IMeasure = newMeasure("m4", m => m.localId("m4"));