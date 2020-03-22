// (C) 2019-2020 GoodData Corporation
import { IAxis } from "../Config";
import { IHighchartsAxisExtend } from "../HighchartsExtend";

export const isPrimaryYAxis = (yAxis: IAxis | IHighchartsAxisExtend) => !yAxis.opposite;
