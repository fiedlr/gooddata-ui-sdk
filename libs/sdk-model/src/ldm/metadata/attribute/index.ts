// (C) 2019-2020 GoodData Corporation
import { IMetadataObject, isMetadataObject } from "../types";
import { ObjRef } from "../../../objRef";

/**
 * Attribute metadata object
 *
 * @public
 */
export interface IAttributeMetadataObject extends IMetadataObject {
    type: "attribute";
    /**
     * A reference to the attribute displayForm that represents implicit drill down step
     *
     * Drilling of this type will be available in any report/dashboard where this attribute will be present.
     * This will be performed on attribute headers and attribute element headers. These will be defined in LDM.
     */
    drillDownStep?: ObjRef;
}

/**
 * Tests whether the provided object is of type {@link IAttributeMetadataObject}.
 *
 * @param obj - object to test
 * @public
 */
export function isAttributeMetadataObject(obj: any): obj is IAttributeMetadataObject {
    return isMetadataObject(obj) && obj.type === "attribute";
}
