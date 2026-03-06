const db = require('../config/db');

const getDashboardData = async () => {
    const result = await db.query(`
        SELECT 
            o.id AS onboarding_id,
            c.company_name,
            c.industry,
            c.country,
            u.name AS assigned_user,
            o.status,
            o.notes,
            o.created_at,
            o.updated_at
        FROM onboarding o
        JOIN companies c ON o.company_id = c.id
        JOIN users u ON o.assigned_to = u.id
        ORDER BY o.created_at DESC
    `);
    return result.rows;
};

module.exports = { getDashboardData };