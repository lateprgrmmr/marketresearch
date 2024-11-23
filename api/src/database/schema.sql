CREATE TYPE user_role AS ENUM ('admin', 'user');
CREATE TYPE entity_type AS ENUM ('default');

CREATE TABLE entity (
    id SERIAL PRIMARY KEY,
    fname TEXT NOT NULL,
    lname TEXT NOT NULL,
    email TEXT UNIQUE,
    type entity_type NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    -- uniqueid UUID NOT NULL DEFAULT extensions.gen_random_uuid() UNIQUE,
    entity_id INTEGER NOT NULL REFERENCES entity(id),
    email TEXT UNIQUE,
    phone TEXT UNIQUE, -- i.e. +15555555551 (where +1 is US country code)
    PASSWORD TEXT NOT NULL DEFAULT 'NOTSET',
    role user_role NOT NULL DEFAULT 'admin',
    CONSTRAINT has_email_or_phone CHECK (email IS NOT NULL OR phone IS NOT NULL)
);
