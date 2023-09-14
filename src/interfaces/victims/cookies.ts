export interface ICookie {
  origin: string;
  name: string;
  value: string;
}

export interface ICookies {
  name: string;
  important: boolean;
  cookies: ICookie[];
}
