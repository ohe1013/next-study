export interface MenuAPi {
    object:           string;
    results:          Result[];
    next_cursor:      null;
    has_more:         boolean;
    type:             string;
    page_or_database: PageOrDatabase;
    request_id:       string;
}

export interface PageOrDatabase {
}

export interface Result {
    object:           string;
    id:               string;
    created_time:     Date;
    last_edited_time: Date;
    created_by:       TedBy;
    last_edited_by:   TedBy;
    cover:            Cover;
    icon:             null;
    parent:           Parent;
    archived:         boolean;
    properties:       Properties;
    url:              string;
    public_url:       null;
}

export interface Cover {
    type: string;
    file: File;
}

export interface File {
    url:         string;
    expiry_time: Date;
}

export interface TedBy {
    object: string;
    id:     string;
}

export interface Parent {
    type:        string;
    database_id: string;
}

export interface Properties {
    search:   Bad;
    up:       Down;
    bad:      Bad;
    location: Bad;
    detail:   Detail;
    category: Bad;
    down:     Down;
    mainmenu: Detail;
    good:     Bad;
    name:     Name;
}

export interface Bad {
    id:        string;
    type:      string;
    rich_text: RichText[];
}

export interface RichText {
    type:        Type;
    text:        Text;
    annotations: Annotations;
    plain_text:  string;
    href:        null | string;
}

export interface Annotations {
    bold:          boolean;
    italic:        boolean;
    strikethrough: boolean;
    underline:     boolean;
    code:          boolean;
    color:         Color;
}

export enum Color {
    Default = "default",
}

export interface Text {
    content: string;
    link:    Link | null;
}

export interface Link {
    url: string;
}

export enum Type {
    Text = "text",
}

export interface Detail {
    id:           string;
    type:         string;
    multi_select: MultiSelect[];
}

export interface MultiSelect {
    id:    string;
    name:  string;
    color: string;
}

export interface Down {
    id:     string;
    type:   string;
    number: number;
}

export interface Name {
    id:    string;
    type:  string;
    title: RichText[];
}
