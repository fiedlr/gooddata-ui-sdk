// (C) 2019 GoodData Corporation
import React from "react";
import { WrappedComponentProps, injectIntl } from "react-intl";
import Dropdown, { DropdownBody, DropdownButton } from "@gooddata/goodstrap/lib/Dropdown/Dropdown";
import DisabledBubbleMessage from "../DisabledBubbleMessage";

import { getTranslation } from "../../utils/translations";
import { IVisualizationProperties } from "../../interfaces/Visualization";
import { IDropdownItem } from "../../interfaces/Dropdown";
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";

export interface IDropdownControlProps {
    valuePath: string;
    properties: IVisualizationProperties;
    labelText?: string;
    value?: string;
    items?: IDropdownItem[];
    disabled?: boolean;
    width?: number;
    showDisabledMessage?: boolean;
    pushData(data: any): void;
    pushInitialValue?: boolean;
}

const alignPoints = ["bl tl", "tl bl", "br tr", "tr br"];

const DROPDOWN_ALIGNMENTS = alignPoints.map((align) => ({ align, offset: { x: 1, y: 0 } }));

class DropdownControl extends React.PureComponent<IDropdownControlProps & WrappedComponentProps> {
    public static defaultProps = {
        value: "",
        items: [] as IDropdownItem[],
        disabled: false,
        width: 117,
        showDisabledMessage: false,
        pushInitialValue: false,
    };

    constructor(props: IDropdownControlProps & WrappedComponentProps) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.getSelectedItem = this.getSelectedItem.bind(this);

        const { value, pushInitialValue } = props;

        if (pushInitialValue) {
            this.onSelect(this.getSelectedItem(value));
        }
    }

    public render() {
        const { disabled, labelText, value, width, items, showDisabledMessage, intl } = this.props;
        const selectedItem = this.getSelectedItem(value) || {};

        return (
            <DisabledBubbleMessage showDisabledMessage={showDisabledMessage}>
                <div className="adi-properties-dropdown-container">
                    <span className="input-label-text">{getTranslation(labelText, intl)}</span>
                    <label className="adi-bucket-inputfield gd-input gd-input-small">
                        <Dropdown
                            disabled={disabled}
                            button={this.getDropdownButton(selectedItem)}
                            closeOnParentScroll={true}
                            closeOnMouseDrag={true}
                            alignPoints={DROPDOWN_ALIGNMENTS}
                            body={
                                <DropdownBody
                                    width={width}
                                    items={items}
                                    onSelect={this.onSelect}
                                    selection={selectedItem}
                                />
                            }
                            className="adi-bucket-dropdown"
                        />
                    </label>
                </div>
            </DisabledBubbleMessage>
        );
    }

    private getDropdownButton(selectedItem: IDropdownItem) {
        const { icon, title } = selectedItem;

        return <DropdownButton value={title} iconLeft={icon} />;
    }

    private onSelect(selectedItem: IDropdownItem) {
        const { valuePath, properties, pushData } = this.props;

        // we must not change the properties at any cost, so deep clone for now.
        // ideally we should use st. like immer with copy on write to not clone everything all the time
        const clonedProperties = cloneDeep(properties);
        set(clonedProperties, `controls.${valuePath}`, selectedItem.value);

        pushData({ properties: clonedProperties });
    }

    private getSelectedItem(value: string): IDropdownItem {
        if (this.props.items) {
            return this.props.items.find((item) => item.value === value);
        }

        return undefined;
    }
}

export default injectIntl(DropdownControl);
