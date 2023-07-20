import { FormControl } from "@angular/forms";

export class PermissionClass {
   section: FormControl<string | null> = new FormControl(null);
   can_View: FormControl<boolean | null> = new FormControl(null);
   can_Add: FormControl<boolean | null> = new FormControl(null);
   can_Edit: FormControl<boolean | null> = new FormControl(null);
   can_Delete: FormControl<boolean | null> = new FormControl(null);
 }
 