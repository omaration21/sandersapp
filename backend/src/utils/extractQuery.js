export const extractQuery = (text) => {
    const regexQuery = /sp_get_donations\(\s*(NULL|'(\d{4}-\d{2}-\d{2})')\s*,\s*(NULL|'(\d{4}-\d{2}-\d{2})')\s*,\s*(NULL|'[^']*')\s*,\s*(NULL|\d+)\s*,\s*(TRUE|FALSE)\s*,\s*(TRUE|FALSE)\s*\)/;
    return text.match(regexQuery);
};