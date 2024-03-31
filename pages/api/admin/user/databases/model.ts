export interface UserQuery {
  object: string
  results: Result[]
  next_cursor: null
  has_more: boolean
  type: string
  page_or_database: PageOrDatabase
  developer_survey: string
  request_id: string
}

interface PageOrDatabase {}

interface Result {
  object: string
  id: string
  created_time: Date
  last_edited_time: Date
  created_by: TedBy
  last_edited_by: TedBy
  cover: null
  icon: null
  parent: Parent
  archived: boolean
  properties: Properties
  url: string
  public_url: null
}

interface TedBy {
  object: string
  id: string
}

interface Parent {
  type: string
  database_id: string
}

interface Properties {
  이름: 이름
  up: Down
  down: Down
  id: ID
}

interface Down {
  id: string
  type: string
  number: number
}

interface ID {
  id: string
  type: string
  title: Title[]
}

interface Title {
  type: string
  text: Text
  annotations: Annotations
  plain_text: string
  href: null
}

interface Annotations {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color: string
}

interface Text {
  content: string
  link: null
}

interface 이름 {
  id: string
  type: string
  rich_text: Title[]
}
