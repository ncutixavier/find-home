exports.paginate = (query, { page, limit }) => {
    const offset = (page - 1) * limit

    return {
        ...query,
        page,
        limit,
        offset,
    };
};