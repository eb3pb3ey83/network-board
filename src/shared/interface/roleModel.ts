export interface RoleRowData {
  id: number;
  name: string;
  number: number;
  status: string;
  super_adm: '0' | '1';
  updated_time: string;
}

export interface RoleAccessModel {
  label: string;
  children: Children[];
}

export interface Children {
  label: string;
  group: { checked: boolean; label: string; value: number }[];
}

export interface RoleAccessResModel {
  id: number;
  menu: string;
  page: string;
  menu_auths: {
    id: number;
    auth_type: 'R' | 'E';
  }[];
}

export interface GetRoleAccessResModel {
  id: number;
  super_adm: string;
  status: string;
  name: string;
  roleMenus: {
    id: number;
    menu: string;
    page: string;
    url: string;
    auth_type: 'R' | 'E';
    status: string;
  }[];
}

export interface RoleMenuData {
  role_id: number;
  role_name: string;
}
