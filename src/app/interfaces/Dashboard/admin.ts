import { IPermission } from "./ipermission";

export interface Admin {
   id?: number | null,
   name: string | null,
   email: string | null,
   password?: string | null,
   avatar: string | null,
   address: string | null,
   gender? : boolean | null,
   phone: string | null,
   birth_Date : string | null,
   added_Date : string | null,
   permissions : IPermission[]
}
