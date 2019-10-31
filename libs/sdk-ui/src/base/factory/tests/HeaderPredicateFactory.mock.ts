// (C) 2007-2018 GoodData Corporation
import { IHeaderPredicateContext } from "../../interfaces/HeaderPredicate";
import { barChartForDrillTests } from "../../../../__mocks__/fixtures";
import { IAttributeDescriptor, IMeasureDescriptor, IResultAttributeHeader } from "@gooddata/sdk-backend-spi";

export const measureHeaders: { [key: string]: IMeasureDescriptor } = {
    uriBasedMeasure: {
        measureHeaderItem: {
            uri: "/uriBasedMeasureUri",
            localIdentifier: "uriBasedMeasureLocalIdentifier",
            identifier: "uriBasedMeasureIdentifier",
            name: "uriBasedMeasureName",
            format: "#,##0.00",
        },
    },
    identifierBasedMeasure: {
        measureHeaderItem: {
            uri: "identifierBasedMeasureUri",
            localIdentifier: "identifierBasedMeasureLocalIdentifier",
            identifier: "identifierBasedMeasureIdentifier",
            name: "identifierBasedMeasureName",
            format: "#,##0.00",
        },
    },

    uriBasedRatioMeasure: {
        measureHeaderItem: {
            localIdentifier: "uriBasedRatioMeasureLocalIdentifier",
            name: "uriBasedMeasureName",
            format: "#,##0.00",
        },
    },
    identifierBasedRatioMeasure: {
        measureHeaderItem: {
            localIdentifier: "identifierBasedRatioMeasureLocalIdentifier",
            name: "identifierBasedRatioMeasureName",
            format: "#,##0.00",
        },
    },

    uriBasedAdhocMeasure: {
        measureHeaderItem: {
            localIdentifier: "uriBasedAdhocMeasureLocalIdentifier",
            name: "uriBasedAdhocMeasureName",
            format: "#,##0.00",
        },
    },
    identifierBasedAdhocMeasure: {
        measureHeaderItem: {
            localIdentifier: "identifierBasedAdhocMeasureLocalIdentifier",
            name: "identifierBasedAdhocMeasureName",
            format: "#,##0.00",
        },
    },

    uriBasedPPMeasure: {
        measureHeaderItem: {
            localIdentifier: "uriBasedPPMeasureLocalIdentifier",
            name: "uriBasedSPMeasureName",
            format: "#,##0.00",
        },
    },
    identifierBasedPPMeasure: {
        measureHeaderItem: {
            localIdentifier: "identifierBasedPPMeasureLocalIdentifier",
            name: "uriBasedSPMeasureName",
            format: "#,##0.00",
        },
    },

    uriBasedSPMeasure: {
        measureHeaderItem: {
            localIdentifier: "uriBasedSPMeasureLocalIdentifier",
            name: "uriBasedSPMeasureName",
            format: "#,##0.00",
        },
    },
    identifierBasedSPMeasure: {
        measureHeaderItem: {
            localIdentifier: "identifierBasedSPMeasureLocalIdentifier",
            name: "identifierBasedSPMeasureName",
            format: "#,##0.00",
        },
    },

    uriBasedPPRatioMeasure: {
        measureHeaderItem: {
            localIdentifier: "uriBasedPPRatioMeasureLocalIdentifier",
            name: "uriBasedSPRatioMeasureName",
            format: "#,##0.00",
        },
    },
    identifierBasedPPRatioMeasure: {
        measureHeaderItem: {
            localIdentifier: "identifierBasedPPRatioMeasureLocalIdentifier",
            name: "uriBasedSPRatioMeasureName",
            format: "#,##0.00",
        },
    },

    uriBasedSPRatioMeasure: {
        measureHeaderItem: {
            localIdentifier: "uriBasedSPRatioMeasureLocalIdentifier",
            name: "uriBasedSPRatioMeasureName",
            format: "#,##0.00",
        },
    },
    identifierBasedSPRatioMeasure: {
        measureHeaderItem: {
            localIdentifier: "identifierBasedSPRatioMeasureLocalIdentifier",
            name: "identifierBasedSPRatioMeasureName",
            format: "#,##0.00",
        },
    },

    arithmeticMeasure: {
        measureHeaderItem: {
            localIdentifier: "arithmeticMeasureLocalIdentifier",
            name: "arithmeticMeasureName",
            format: "#,##0.00",
        },
    },

    arithmeticMeasureOf2ndOrder: {
        measureHeaderItem: {
            localIdentifier: "arithmeticMeasureOf2ndOrderLocalIdentifier",
            name: "arithmeticMeasureOf2ndName",
            format: "#,##0.00",
        },
    },

    uriBasedCompareArithmeticMeasure: {
        measureHeaderItem: {
            localIdentifier: "uriBasedCompareArithmeticMeasureLocalIdentifier",
            name: "uriBasedCompareArithmeticMeasureName",
            format: "#,##0.00",
        },
    },
    identifierBasedCompareArithmeticMeasure: {
        measureHeaderItem: {
            localIdentifier: "identifierBasedCompareArithmeticMeasureLocalIdentifier",
            name: "identifierBasedCompareArithmeticMeasureName",
            format: "#,##0.00",
        },
    },
    derivedPPFromArithmeticMeasure: {
        measureHeaderItem: {
            localIdentifier: "identifierComparePPDerivedFromAM",
            name: "identifierComparePPDerivedFromAM",
            format: "#,##0.00",
        },
    },
    derivedSPFromArithmeticMeasure: {
        measureHeaderItem: {
            localIdentifier: "identifierCompareSPDerivedFromAM",
            name: "identifierCompareSPDerivedFromAM",
            format: "#,##0.00",
        },
    },
};

export const attributeHeader: IAttributeDescriptor = {
    attributeHeader: {
        uri: "/attributeUri",
        identifier: "attributeIdentifier",
        localIdentifier: "attributeLocalIdentifier",
        name: "attributeName",
        formOf: {
            uri: "/attributeElementUri",
            identifier: "attributeElementIdentifier",
            name: "attributeElementName",
        },
    },
};

export const attributeHeaderItem: IResultAttributeHeader = {
    attributeHeaderItem: {
        uri: "/attributeItemUri",
        name: "attributeItemName",
    },
};

export const context: IHeaderPredicateContext = {
    dv: barChartForDrillTests,
};
