export type DateValue = 'year' | 'month' | 'date'

export type DateText = '年' | '月' | '日'

export type DateType = {
    text: DateText;
    value: DateValue;
}

export type AccountTypeValue = '-' | '+'

export type AccountTypeText = '收入' | '支出'

export type AccountType = {
    text: AccountTypeText;
    value: AccountTypeValue;
}

export type ChartSourceType = {
    tagName: string;
    count: number;
    proportion: string | null;
};