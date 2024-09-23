import { NavIconName } from '../../shared/constants/enums';

export interface AdminNavModel {
  name: string;
  path: string;
  icon?: NavIconName;
  subNav?: SubNav[];
}

interface SubNav {
  name: string;
  path: string;
}
