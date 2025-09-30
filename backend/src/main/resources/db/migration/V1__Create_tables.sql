-- Create users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create seekrets table
CREATE TABLE seekrets (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    unique_link VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assignments_generated BOOLEAN DEFAULT FALSE,
    owner_id BIGINT NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create participants table
CREATE TABLE participants (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    seekret_id BIGINT NOT NULL,
    FOREIGN KEY (seekret_id) REFERENCES seekrets(id) ON DELETE CASCADE
);

-- Create assignments table
CREATE TABLE assignments (
    id BIGSERIAL PRIMARY KEY,
    giver_id BIGINT NOT NULL,
    receiver_id BIGINT NOT NULL,
    seekret_id BIGINT NOT NULL,
    FOREIGN KEY (giver_id) REFERENCES participants(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES participants(id) ON DELETE CASCADE,
    FOREIGN KEY (seekret_id) REFERENCES seekrets(id) ON DELETE CASCADE,
    UNIQUE(giver_id, seekret_id),
    UNIQUE(receiver_id, seekret_id)
);

-- Create constraints table
CREATE TABLE constraints (
    id BIGSERIAL PRIMARY KEY,
    giver_id BIGINT NOT NULL,
    cannot_receive_id BIGINT NOT NULL,
    seekret_id BIGINT NOT NULL,
    FOREIGN KEY (giver_id) REFERENCES participants(id) ON DELETE CASCADE,
    FOREIGN KEY (cannot_receive_id) REFERENCES participants(id) ON DELETE CASCADE,
    FOREIGN KEY (seekret_id) REFERENCES seekrets(id) ON DELETE CASCADE,
    UNIQUE(giver_id, cannot_receive_id, seekret_id)
);

-- Create indexes for better performance
CREATE INDEX idx_seekrets_owner_id ON seekrets(owner_id);
CREATE INDEX idx_seekrets_unique_link ON seekrets(unique_link);
CREATE INDEX idx_participants_seekret_id ON participants(seekret_id);
CREATE INDEX idx_assignments_seekret_id ON assignments(seekret_id);
CREATE INDEX idx_constraints_seekret_id ON constraints(seekret_id);
