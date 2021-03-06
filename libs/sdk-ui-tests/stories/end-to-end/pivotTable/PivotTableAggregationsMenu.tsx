// (C) 2020 GoodData Corporation
import { ReferenceLdm } from "@gooddata/reference-workspace";
import { PivotTable } from "@gooddata/sdk-ui-pivot";
import { storiesOf } from "@storybook/react";
import React, { Component } from "react";
import { ReferenceWorkspaceId, StorybookBackend } from "../../_infra/backend";
import { StoriesForEndToEndTests } from "../../_infra/storyGroups";

const backend = StorybookBackend();
const measures = [ReferenceLdm.Amount, ReferenceLdm.Won];
const attributes = [ReferenceLdm.Product.Name, ReferenceLdm.Department];
const columns = [ReferenceLdm.ForecastCategory, ReferenceLdm.Region];

class PivotTableAggregationsMenu extends Component {
    public render() {
        return (
            <div
                style={{ width: 1000, height: 300, marginTop: 20, resize: "both", overflow: "auto" }}
                className="s-pivot-table-aggregations-menu"
            >
                <PivotTable
                    backend={backend}
                    workspace={ReferenceWorkspaceId}
                    measures={measures}
                    rows={attributes}
                    columns={columns}
                    config={{
                        menu: {
                            aggregations: true,
                            aggregationsSubMenu: true,
                        },
                    }}
                />
            </div>
        );
    }
}

storiesOf(`${StoriesForEndToEndTests}/Pivot Table`, module).add(
    "complex table with aggregations menu",
    () => <PivotTableAggregationsMenu />,
);
