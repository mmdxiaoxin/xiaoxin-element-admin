// export type LayoutType =
//     | 'vertical'
//     | 'classic'
//     | 'transverse'
//     | 'columns';
export type LayoutType = 'classic' | 'columns';

export type AssemblySizeType = 'large' | 'default' | 'small';

export type LanguageType = 'zh' | 'en' | null;

/* GlobalState */
export interface GlobalState {
    layout: LayoutType;
    assemblySize: AssemblySizeType;
    language: LanguageType;
    maximize: boolean;
    primary: string;
    isDark: boolean;
    isGrey: boolean;
    isWeak: boolean;
    asideInverted: boolean;
    headerInverted: boolean;
    isCollapse: boolean;
    accordion: boolean;
    breadcrumb: boolean;
    breadcrumbIcon: boolean;
    tabs: boolean;
    tabsIcon: boolean;
    footer: boolean;
}
