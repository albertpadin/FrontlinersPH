# DATA MODELS

Firebase data models for FrontlinersPH.



## Location

**Firebase data model**

```
collection: locations

- latest_revision                   # Public field. App clients should display information
                                    # stored in this field.

    - type: <enum> [
        "HOSPITAL",
        "PRODUCTION_HUB",
        "KITCHEN",
        "QUARANTINE_AREA",
        "FRONTLINERS_ACCOMMODATION"
    ]
    - name: <string>
    - address: <object>
        - city: <string>            # City or municipality?
        - province: <string>
    - statistics                    # Readonly summary of requests/commitments for this location.
                                    # Contains a key for each type of need?
        - meals:
          - total_requested: <number>
          - total_commited: <number>
        - face_masks:
          - total_requested: <number>
          - total_commited: <number>

- revisions: <subcollection>        # Private subcollection, only allow create operations.
                                    # We can have a cloud function to take the latest item
                                    # in this subcollection and set `latest_revision` to it.

    - data: <object>                # Same as latest_revision
        - type: <enum>
        - name: <string>
        - address.city: <string>
        - address.province: <string>
    - author: <object>
        - id: <string>              # Firebase auth user ID
        - name: <string>            # Obtained from Firebase auth user info
        - photoURL: <string>        # Obtained from Firebase auth user info
    - created_at: <timestamp>       # Use server timestamp
```

**App form fields**

| Revision data field | Form field           | Form field type |
| ------------------- | -------------------- | --------------- |
| name                | Name                 | Text            |
| type                | Type                 | Select          |
| address.city        | City or municipality | Text            |
| address.province    | Province             | Text            |



## NEED REQUEST

**Firebase data model**

```
collection: need_requests

- latest_revision:                  # Public field. App clients should display information
                                    # stored in this field.

    - location: <string>            # Firebase ID for location data
    - type: <enum> [
        "MEALS",
        "FACE_MASKS",
        "FACE_SHIELDS",
        "SUITS",
        "RAW_MATERIALS",
        "OTHER",
        "CASH"
    ]
    - quantity: <number>
    - unit: <enum> [                # Need more units. Makes it easier to accurately
        "PIECES",                   # aggregate data in Firebase.
        "PESOS",
        "KG"
    ],
    - date_needed: <date>
    - details: <string>             # Provide more info about the request, e.g. what raw
                                    # materials are needed, etc.

- revisions: <subcollection>        # Private subcollection, only allow create operations.
                                    # We can have a cloud function to take the latest item
                                    # in this subcollection and set `latest_revision` to it.

    - data: <object>                # Same as latest_revision
        - location: <string>
        - type: <enum>
        - quantity: <number>
        - unit: <enum>
        - date_needed: <date>
        - details: <string>
    - author: <object>
        - id: <string>              # Firebase auth user ID
        - name: <string>            # Obtained from Firebase auth user info
        - photoURL: <string>        # Obtained from Firebase auth user info
    - created_at: <timestamp>       # Use server timestamp
```

**App form fields**

| Revision data field | Form field             | Form field type |
| ------------------- | ---------------------- | --------------- |
| location            | Location               | Select          |
| type                | Type                   | Select          |
| quantity            | Quantity               | Number          |
| unit                | Unit (e.g. pieces, kg) | Select          |
| date_needed         | Date needed            | Date            |
| details             | Additional details     | Textarea        |



## NEED COMMITMENT

**Firebase data model**

```
collection: need_commitments

- latest_revision:                  # Public field. App clients should display information
                                    # stored in this field.

    - location: <string>            # Firebase ID for location data
    - type: <enum> [
        "MEALS",
        "FACE_MASKS",
        "FACE_SHIELDS",
        "SUITS",
        "RAW_MATERIALS",
        "OTHER",
        "CASH"
    ]
    - quantity: <number>
    - unit: <enum> [                # Need more units. Makes it easier to accurately
        "PIECES",                   # aggregate data in Firebase.
        "PESOS",
        "KG"
    ],
    - delivery_date: <date>
    - details: <string>             # Provide more info about the request, e.g. what raw
                                    # materials will be provided, etc.

- revisions: <subcollection>        # Private subcollection, only allow create operations.
                                    # We can have a cloud function to take the latest item
                                    # in this subcollection and set `latest_revision` to it.

    - data: <object>                # Same as latest_revision
        - location: <string>
        - type: <enum>
        - quantity: <number>
        - unit: <enum>
        - delivery_date: <date>
        - details: <string>
    - author: <string>              # Firebase auth user ID
    - created_at: <timestamp>       # Use server timestamp
```

**App form fields**

| Revision data field | Form field             | Form field type |
| ------------------- | ---------------------- | --------------- |
| location            | Location               | Select          |
| type                | Type                   | Select          |
| quantity            | Quantity               | Number          |
| unit                | Unit (e.g. pieces, kg) | Select          |
| delivery_date       | Delivery date          | Date            |
| details             | Additional details     | Textarea        |
