export interface FormattedSavedTracks {
    href: string;
    items: Object[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}