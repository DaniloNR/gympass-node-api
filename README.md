# Gympass api

# Functional Requirements

- [x] User registration must be possible;
- [x] User authentication must be possible;
- [x] It must be possible to retrieve the profile of a logged-in user;
- [x] It must be possible to retrieve the number of check-ins performed by the logged-in user;
- [x] It must be possible for the user to retrieve their check-in history;
- [x] It must be possible for the user to search for nearby gyms up to 10km;
- [x] It must be possible for the user to search for gyms by name;
- [x] It must be possible for the user to check-in at a gym;
- [x] User check-in must be validated;
- [x] It must be possible to register a gym;

## Business Rules

- [x] The user must not be able to register with a duplicate email;
- [x] The user cannot make 2 check-ins on the same day;
- [x] The user cannot check-in if not near (100m) the gym;
- [x] Check-in can only be validated up to 20 minutes after it is created;
- [ ] Check-in can only be validated by administrators;
- [ ] The gym can only be registered by administrators;

## Non-functional Requirements

- [x] User password needs to be encrypted;
- [x] Application data needs to be persisted in a PostgreSQL database;
- [x] All data lists need to be paginated with 20 items per page;
- [ ] User must be identified by a JWT (JSON Web Token);
