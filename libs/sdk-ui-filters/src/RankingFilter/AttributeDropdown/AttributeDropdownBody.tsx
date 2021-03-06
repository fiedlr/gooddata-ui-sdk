// (C) 2020 GoodData Corporation
import React from "react";
import Overlay from "@gooddata/goodstrap/lib/core/Overlay";
import { ObjRefInScope, areObjRefsEqual, objRefToString } from "@gooddata/sdk-model";
import { AttributeItem } from "./DropdownItems/AttributeItem";
import { IAttributeDropdownItem } from "../types";
import { AllRecordsItem } from "./DropdownItems/AllRecordsItem";

interface IAttributeDropdownBodyProps {
    items: IAttributeDropdownItem[];
    selectedItemRef: ObjRefInScope;
    onSelect: (ref?: ObjRefInScope) => void;
    onClose: () => void;
    onDropDownItemMouseOver?: (ref: ObjRefInScope) => void;
    onDropDownItemMouseOut?: () => void;
}

export const AttributeDropdownBody: React.FC<IAttributeDropdownBodyProps> = ({
    items,
    selectedItemRef,
    onSelect,
    onClose,
    onDropDownItemMouseOver,
    onDropDownItemMouseOut,
}) => {
    return (
        <Overlay
            closeOnOutsideClick={true}
            alignTo=".gd-rf-attribute-dropdown-button"
            alignPoints={[{ align: "bl tl" }, { align: "tl bl" }]}
            onClose={onClose}
        >
            <div className="gd-dropdown overlay gd-rf-inner-overlay-dropdown gd-rf-attribute-dropdown-body s-rf-attribute-dropdown-body">
                {items.map((item) => {
                    const { type, ref } = item;
                    return (
                        <AttributeItem
                            key={objRefToString(ref)}
                            iconClass={type === "DATE" ? "icon-date" : "icon-attribute"}
                            item={item}
                            isSelected={areObjRefsEqual(ref, selectedItemRef)}
                            onSelect={onSelect}
                            onDropDownItemMouseOver={onDropDownItemMouseOver}
                            onDropDownItemMouseOut={onDropDownItemMouseOut}
                        />
                    );
                })}
                <div className="gd-rf-attribute-dropdown-separator" />
                <AllRecordsItem isSelected={!selectedItemRef} onSelect={onSelect} />
            </div>
        </Overlay>
    );
};
