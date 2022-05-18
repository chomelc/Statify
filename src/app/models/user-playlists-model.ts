export interface FormattedPlaylists {
    href: string;
    items: Object[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}