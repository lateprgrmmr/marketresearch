
INSERT INTO entity (id, fname, lname, email, type) 
VALUES (0, 'Kevin', 'Bratt', 'kevinbratt1488+test@gmail.com', 'default'::entity_type);

INSERT INTO users (id, email, role, entity_id) 
SELECT 0, 'kevinbratt1488@gmail.com', 'admin'::user_role, id
FROM entity WHERE id = 0;