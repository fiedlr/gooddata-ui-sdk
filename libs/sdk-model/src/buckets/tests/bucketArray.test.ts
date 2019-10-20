// (C) 2019 GoodData Corporation

import { AttributeInBucket, MeasureInBucket, newBucket, IBucket, AttributeOrMeasure } from "../index";
import { Account, Activity, Velocity, Won } from "../../../__mocks__/model";
import { attributeLocalId, IAttribute, idMatchAttribute } from "../../attribute";
import {
    bucketsAttributes,
    bucketsById,
    bucketsFindAttribute,
    bucketsFindMeasure,
    bucketsIsEmpty,
    bucketsItems,
    bucketsMeasures,
    bucketsTotals,
} from "../bucketArray";
import { idMatchMeasure, IMeasure, measureId } from "../../measure";
import { ITotal, newTotal } from "../../base/totals";

const Total1 = newTotal("sum", Won, Account.Name);
const Total2 = newTotal("min", Won, Account.Name);

const EmptyBucket = newBucket("emptyBucket");
const AttributeBucket1 = newBucket("attributeBucket1", Account.Name);
const AttributeBucket2 = newBucket("attributeBucket2", Account.Default);
const AttributeBucket3 = newBucket("attributeBucket2", Account.Name, Activity.Subject);
const MixedBucket1 = newBucket("mixedBucket1", Activity.Default, Won);
const MeasureBucket1 = newBucket("measureBucket1", Won);
const MeasureBucket2 = newBucket("measureBucket2", Velocity.Sum, Velocity.Max);
const MeasureBucket3 = newBucket("measureBucket3", Won, Velocity.Min);
const BucketWithTotals1 = newBucket("bucketWithTotals1", Won, Total1);
const BucketWithTotals2 = newBucket("bucketWithTotals2", Won, Total2);

describe("bucketsAttributes", () => {
    const Scenarios: Array<[string, any, any, IAttribute[]]> = [
        ["no attributes when empty input", [], undefined, []],
        ["no attributes when input undefined", undefined, undefined, []],
        ["no attributes when input null", null, undefined, []],
        ["no attributes when empty bucket", [EmptyBucket], undefined, []],
        ["no attributes from measure buckets", [MeasureBucket1, MeasureBucket2], undefined, []],
        ["no attributes if predicate won't match", [AttributeBucket2, AttributeBucket3], () => false, []],
        [
            "attributes from all buckets",
            [AttributeBucket1, AttributeBucket2],
            undefined,
            [Account.Name, Account.Default],
        ],
        [
            "attributes from mixed buckets",
            [MixedBucket1, AttributeBucket2],
            undefined,
            [Activity.Default, Account.Default],
        ],
        [
            "duplicate attributes if present in buckets",
            [AttributeBucket1, AttributeBucket3],
            undefined,
            [Account.Name, Account.Name, Activity.Subject],
        ],
    ];

    it.each(Scenarios)("should return %s", (_desc, bucketsArg, predicateArg, expectedResult) => {
        expect(bucketsAttributes(bucketsArg, predicateArg)).toEqual(expectedResult);
    });
});

describe("bucketsMeasures", () => {
    const Scenarios: Array<[string, any, any, IMeasure[]]> = [
        ["no measures when empty input", [], undefined, []],
        ["no measures when input undefined", undefined, undefined, []],
        ["no measures when input null", null, undefined, []],
        ["no measures from attr buckets", [AttributeBucket1, AttributeBucket2], undefined, []],
        ["no measures if predicate won't match", [MeasureBucket1, MeasureBucket2], () => false, []],
        [
            "attributes from all buckets",
            [MeasureBucket1, MeasureBucket2],
            undefined,
            [Won, Velocity.Sum, Velocity.Max],
        ],
        [
            "attributes from mixed buckets",
            [MixedBucket1, MeasureBucket2],
            undefined,
            [Won, Velocity.Sum, Velocity.Max],
        ],
        [
            "duplicate attributes if present in buckets",
            [MeasureBucket1, MeasureBucket3],
            undefined,
            [Won, Won, Velocity.Min],
        ],
    ];

    it.each(Scenarios)("should return %s", (_desc, bucketsArg, predicateArg, expectedResult) => {
        expect(bucketsMeasures(bucketsArg, predicateArg)).toEqual(expectedResult);
    });
});

describe("bucketsFindAttribute", () => {
    const Scenarios: Array<[string, any, any, AttributeInBucket | undefined]> = [
        ["nothing when empty input", [], undefined, undefined],
        ["nothing when undefined input", undefined, undefined, undefined],
        ["nothing when null input", null, undefined, undefined],
        ["nothing when empty bucket", [EmptyBucket], undefined, undefined],
        ["nothing when in measure buckets", [MeasureBucket1, MeasureBucket2], undefined, undefined],
        [
            "nothing when predicate matches nothing",
            [AttributeBucket1, AttributeBucket2],
            () => false,
            undefined,
        ],
        [
            "first found attribute in bucket",
            [AttributeBucket1, AttributeBucket3],
            undefined,
            { bucket: AttributeBucket1, idx: 0, attribute: Account.Name },
        ],
        [
            "first found attribute in mixed bucket",
            [MixedBucket1, AttributeBucket1],
            undefined,
            { bucket: MixedBucket1, idx: 0, attribute: Activity.Default },
        ],
        [
            "first found attribute when measure bucket first",
            [MeasureBucket1, MixedBucket1, AttributeBucket1],
            undefined,
            { bucket: MixedBucket1, idx: 0, attribute: Activity.Default },
        ],
        [
            "attribute by custom predicate",
            [MeasureBucket1, MixedBucket1, AttributeBucket3],
            idMatchAttribute(attributeLocalId(Activity.Subject)),
            { bucket: AttributeBucket3, idx: 1, attribute: Activity.Subject },
        ],
        [
            "attribute by local id",
            [MeasureBucket1, MixedBucket1, AttributeBucket3],
            attributeLocalId(Activity.Subject),
            { bucket: AttributeBucket3, idx: 1, attribute: Activity.Subject },
        ],
    ];

    it.each(Scenarios)("should find %s", (_desc, bucketsArg, predicateArg, expectedResult) => {
        expect(bucketsFindAttribute(bucketsArg, predicateArg)).toEqual(expectedResult);
    });
});

describe("bucketsFindMeasure", () => {
    const Scenarios: Array<[string, any, any, MeasureInBucket | undefined]> = [
        ["nothing when empty input", [], undefined, undefined],
        ["nothing when undefined input", undefined, undefined, undefined],
        ["nothing when null input", null, undefined, undefined],
        ["nothing when empty bucket", [EmptyBucket], undefined, undefined],
        ["nothing when in measure buckets", [AttributeBucket1, AttributeBucket2], undefined, undefined],
        ["nothing when predicate matches nothing", [MeasureBucket1, MeasureBucket2], () => false, undefined],
        [
            "first found measure in bucket",
            [MeasureBucket1, MeasureBucket3],
            undefined,
            { bucket: MeasureBucket1, idx: 0, measure: Won },
        ],
        [
            "first found measure in mixed bucket",
            [MixedBucket1, AttributeBucket1],
            undefined,
            { bucket: MixedBucket1, idx: 1, measure: Won },
        ],
        [
            "first found measure when attribute bucket first",
            [AttributeBucket1, MixedBucket1, MeasureBucket1],
            undefined,
            { bucket: MixedBucket1, idx: 1, measure: Won },
        ],
        [
            "measure by custom predicate",
            [AttributeBucket3, MixedBucket1, MeasureBucket3],
            idMatchMeasure(measureId(Velocity.Min)),
            { bucket: MeasureBucket3, idx: 1, measure: Velocity.Min },
        ],
        [
            "measure by local id",
            [AttributeBucket3, MixedBucket1, MeasureBucket3],
            measureId(Velocity.Min),
            { bucket: MeasureBucket3, idx: 1, measure: Velocity.Min },
        ],
    ];

    it.each(Scenarios)("should find %s", (_desc, bucketsArg, predicateArg, expectedResult) => {
        expect(bucketsFindMeasure(bucketsArg, predicateArg)).toEqual(expectedResult);
    });
});

describe("bucketsById", () => {
    const Buckets = [
        EmptyBucket,
        MeasureBucket1,
        AttributeBucket1,
        MixedBucket1,
        AttributeBucket3,
        MeasureBucket3,
    ];

    const Scenarios: Array<[string, any, any[], IBucket[]]> = [
        ["nothing if buckets undefined", undefined, ["measureBucket1"], []],
        ["nothing if buckets null", null, ["measureBucket1"], []],
        ["nothing if buckets empty", [], ["measureBucket1"], []],
        ["no buckets when no ids provided", Buckets, [undefined], []],
        ["no buckets when empty ids", Buckets, [], []],
        ["no buckets when no matching ids", Buckets, ["notFound"], []],
        ["single matching bucket", Buckets, ["measureBucket1"], [MeasureBucket1]],
        [
            "multiple matching buckets",
            Buckets,
            ["measureBucket1", "mixedBucket1", "measureBucket3"],
            [MeasureBucket1, MixedBucket1, MeasureBucket3],
        ],
        [
            "buckets in order they appear on input",
            Buckets,
            ["mixedBucket1", "measureBucket1"],
            [MeasureBucket1, MixedBucket1],
        ],
        [
            "only buckets that are on input",
            Buckets,
            ["notFound1", "mixedBucket1", "notFound2"],
            [MixedBucket1],
        ],
    ];

    it.each(Scenarios)("should find %s", (_desc, bucketsArg, idsArg, expectedResult) => {
        expect(bucketsById(bucketsArg, ...idsArg)).toEqual(expectedResult);
    });
});

describe("bucketsItems", () => {
    const Scenarios: Array<[string, any, AttributeOrMeasure[]]> = [
        ["no items when buckets undefined", undefined, []],
        ["no items when buckets null", null, []],
        ["no items when buckets empty", [], []],
        ["no items when only empty bucket", [EmptyBucket], []],
        ["items from non-empty bucket", [EmptyBucket, MixedBucket1], [Activity.Default, Won]],
        [
            "items in correct order",
            [MixedBucket1, MeasureBucket2],
            [Activity.Default, Won, Velocity.Sum, Velocity.Max],
        ],
    ];

    it.each(Scenarios)("should return %s", (_desc, bucketsArg, expectedResult) => {
        expect(bucketsItems(bucketsArg)).toEqual(expectedResult);
    });
});

describe("bucketsTotals", () => {
    const Scenarios: Array<[string, any, ITotal[]]> = [
        ["no totals when buckets undefined", undefined, []],
        ["no totals when buckets null", null, []],
        ["no totals when buckets empty", [], []],
        ["no items when only empty bucket", [EmptyBucket], []],
        ["totals from non-empty bucket", [EmptyBucket, BucketWithTotals1], [Total1]],
        ["totals in correct order", [BucketWithTotals2, BucketWithTotals1], [Total2, Total1]],
    ];

    it.each(Scenarios)("should return %s", (_desc, bucketsArg, expectedResult) => {
        expect(bucketsTotals(bucketsArg)).toEqual(expectedResult);
    });
});

describe("bucketsIsEmpty", () => {
    const Scenarios: Array<[boolean, string, any]> = [
        [true, "empty input", []],
        [true, "undefined input", undefined],
        [true, "null input", null],
        [true, "empty bucket", [EmptyBucket]],
        [false, "bucket with items", [EmptyBucket, MixedBucket1]],
        [false, "bucket with totals", [EmptyBucket, BucketWithTotals1]],
    ];

    it.each(Scenarios)("should return %s when %s", (expectedResult, _desc, input) => {
        expect(bucketsIsEmpty(input)).toEqual(expectedResult);
    });
});
