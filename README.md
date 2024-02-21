# Gympass api

# Functional Requirements

- [ ] User registration must be possible;
- [ ] User authentication must be possible;
- [ ] It must be possible to retrieve the profile of a logged-in user;
- [ ] It must be possible to retrieve the number of check-ins performed by the logged-in user;
- [ ] It must be possible for the user to retrieve their check-in history;
- [ ] It must be possible for the user to search for nearby gyms;
- [ ] It must be possible for the user to search for gyms by name;
- [ ] It must be possible for the user to check-in at a gym;
- [ ] User check-in must be validated;
- [ ] It must be possible to register a gym;

## Business Rules

- [ ] The user must not be able to register with a duplicate email;
- [ ] The user cannot make 2 check-ins on the same day;
- [ ] The user cannot check-in if not near (100m) the gym;
- [ ] Check-in can only be validated up to 20 minutes after it is created;
- [ ] Check-in can only be validated by administrators;
- [ ] The gym can only be registered by administrators;

## RNFs (Requisitos não-funcionais)

- [ ] User password needs to be encrypted;
- [ ] Application data needs to be persisted in a PostgreSQL database;
- [ ] All data lists need to be paginated with 20 items per page;
- [ ] User must be identified by a JWT (JSON Web Token);
