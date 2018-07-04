type CompanyType = 'isp' | 'business' | 'hosting';

type ResponseElement =
  | 'ip'
  | 'hostname'
  | 'city'
  | 'region'
  | 'country'
  | 'loc'
  | 'postal'
  | 'org'
  | 'asn'
  | 'company'
  | 'carrier';

export interface IpQueryOptions {
  filters: ResponseElement | ResponseElement[];
}

export interface IpQueryResponse {
  ip: string;
  hostname?: string;
  city?: string;
  region?: string;
  country?: string;
  loc?: string;
  postal?: string;
  org?: string;
  asn?: IpQueryAsnResponse;
  company?: IpQueryCompanyResponse;
  carrier?: IpQueryCarrierResponse;
}

export interface IpQueryAsnResponse {
  asn: string;
  name?: string;
  domain?: string;
  route?: string;
  type?: CompanyType;
}

export interface IpQueryCompanyResponse {
  name?: string;
  domain?: string;
  type?: CompanyType;
}

export interface IpQueryCarrierResponse {
  name?: string;
  mcc?: number;
  mnc?: number;
}
