import { formatDate, isEqual } from "date-fns";

export const convertDateToFormat = (date: Date, format: string): string => {
    return formatDate(date, format);
};
