// (C) 2007-2019 GoodData Corporation
import {
    AttributeOrMeasure,
    applyRatioRule,
    IAttribute,
    IFilter,
    newBucket,
    SortItem,
} from "@gooddata/sdk-model";
import * as React from "react";
import { truncate } from "../_commons/truncate";
import { VIEW_BY_ATTRIBUTES_LIMIT } from "../../base/constants/limits";
import { ATTRIBUTE, MEASURES, STACK } from "../../base/constants/bucketNames";
import { sanitizeConfig } from "../../highcharts";
import { stackedChartDimensions } from "../_commons/dimensions";
import { IBucketChartProps } from "../chartProps";
import { CoreColumnChart } from "./CoreColumnChart";
import { getCoreChartProps, IChartDefinition } from "../_commons/chartDefinition";

//
// Public interface
//

/**
 * TODO: SDK8: add docs
 *
 * @public
 */
export interface IColumnChartBucketProps {
    measures: AttributeOrMeasure[];
    viewBy?: IAttribute | IAttribute[];
    stackBy?: IAttribute;
    filters?: IFilter[];
    sortBy?: SortItem[];
}

/**
 * TODO: SDK8: add docs
 *
 * @public
 */
export interface IColumnChartProps extends IBucketChartProps, IColumnChartBucketProps {}

/**
 * [ColumnChart](http://sdk.gooddata.com/gooddata-ui/docs/column_chart_component.html)
 * is a component with bucket props measures, viewBy, stackBy, filters
 *
 * @public
 */
export function ColumnChart(props: IColumnChartProps): JSX.Element {
    return <CoreColumnChart {...getProps(props)} />;
}

//
// Internals
//

const columnChartDefinition: IChartDefinition<IColumnChartBucketProps, IColumnChartProps> = {
    bucketPropsKeys: ["measures", "viewBy", "stackBy", "filters", "sortBy"],
    bucketsFactory: props => {
        const measures = applyRatioRule(props.measures);
        const viewBy = truncate(props.viewBy, VIEW_BY_ATTRIBUTES_LIMIT); // could be one or two attributes

        return [
            newBucket(MEASURES, ...measures),
            newBucket(ATTRIBUTE, ...viewBy),
            newBucket(STACK, props.stackBy),
        ];
    },
    executionFactory: (props, buckets) => {
        const { backend, workspace } = props;

        return backend
            .withTelemetry("ColumnChart", props)
            .workspace(workspace)
            .execution()
            .forBuckets(buckets, props.filters)
            .withSorting(...props.sortBy)
            .withDimensions(stackedChartDimensions);
    },
    propOverridesFactory: (props, buckets) => {
        return {
            config: sanitizeConfig(buckets, props.config),
        };
    },
};

const getProps = getCoreChartProps(columnChartDefinition);
