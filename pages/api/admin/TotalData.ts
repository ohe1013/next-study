export interface TotalData {
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
  request_id: string
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
  adminName: AdminName
  teamName: AdminName
  itemKey: AdminName
  userKey: AdminName
  id: ID
}

interface AdminName {
  id: string
  type: string
  rich_text: RichText[]
}

interface RichText {
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

interface ID {
  id: string
  type: string
  title: RichText[]
}
