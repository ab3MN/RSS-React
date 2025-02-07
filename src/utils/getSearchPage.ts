export const getSearchPage = (page: string | null) => {
  const _page = Number(page);

  return isNaN(_page) || !page ? 1 : _page;
};
