export interface FormattedFollowingArtists {
    artists: Artists;
}

export interface Artists {
    href : string;
    items : Object[];
    limit : number;
    next : string|null;
    cursors : Object[];
    total : number;
}