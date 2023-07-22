export interface Category {
    label: string;
    slug: number;
    parent: { label: string };
    id?: number
    inverseParent: [{
        "id": 29,
        "name": "Computers - Accessories",
        "label": "Computers - Accessories",
        "label_Ar": "Computers - Accessories",
        "parent_Id": 28,
        "slug": "Computers - Accessories",
        "description": "Computers - Accessories",
        "tags": "Computers - Accessories",
        "admin_Id": 3,
        "created_Date": null,
        "admin": null,
        "parent": null,
        "fields": [],
        "inverseParent": [
            {
                "id": 30,
                "name": "Desktop computers",
                "label": "Desktop computers",
                "label_Ar": "Desktop computers",
                "parent_Id": 29,
                "slug": "Desktop computers",
                "description": "Desktop computers",
                "tags": "Desktop computers",
                "admin_Id": 3,
                "created_Date": null,
                "admin": null,
                "parent": null,
                "fields": [
                    {
                        "id": 4,
                        "cat_Id": 30,
                        "name": "Desktop computers",
                        "label": "Desktop computers",
                        "label_Ar": "Desktop computers",
                        "value_Type": "enum",
                        "choice_Type": "Single",
                        "max_Length": 0,
                        "min_Length": 0,
                        "max_Value": 0,
                        "min_Value": 0,
                        "is_Required": false,
                        "parent_Id": null,
                        "cat": null,
                        "parent": null,
                        "choices": [
                            {
                                "id": 5,
                                "field_Id": 4,
                                "label": "kk",
                                "label_Ar": "ll",
                                "slug": "jj",
                                "icon": "kk",
                                "field": null
                            },
                            {
                                "id": 6,
                                "field_Id": 4,
                                "label": "hhhh",
                                "label_Ar": "nnnnn",
                                "slug": "lll",
                                "icon": "kkk",
                                "field": null
                            }
                        ],
                        "inverseParent": []
                    }
                ],
                "inverseParent": [],
                "posts": []
            }
        ],
        "posts": []
    }]
}
