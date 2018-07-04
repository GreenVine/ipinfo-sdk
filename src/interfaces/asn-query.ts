type ResponseElement =
  | 'asn'
  | 'name'
  | 'country'
  | 'allocated'
  | 'registry'
  | 'domain'
  | 'num_ips'
  | 'prefixes';

export interface AsnQueryOptions {
  filters: ResponseElement | ResponseElement[];
}

export interface AsnQueryResponse {
  asn: string;
  name?: string;
  country?: string;
  allocated?: Date;
  registry?: string;
  domain?: string;
  num_ips?: number;
  prefixes: AsnQueryPrefixResponse[];
  prefixes6: AsnQueryPrefixResponse[];
}

export interface AsnQueryPrefixResponse {
  netblock: string;
  id?: string;
  name?: string;
  country?: string;
}
