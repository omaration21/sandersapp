export const extractQuery = (text) => {
    const regexQuery = /(sp_get_donations|sp_get_sum_donations_by_date)\(\s*(NULL|'[\d-]{10}'|CURDATE\(\)(?:\s*[-+]\s*\d+\s*\w*)?)\s*,\s*(NULL|'[\d-]{10}'|CURDATE\(\)(?:\s*[-+]\s*\d+\s*\w*)?)\s*(?:,\s*(NULL|'[^']*')\s*,\s*(NULL|\d+)\s*,\s*(TRUE|FALSE)\s*,\s*(TRUE|FALSE))?\s*\)/;
    return text.match(regexQuery);
};