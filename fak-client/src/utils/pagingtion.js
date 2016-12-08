export const pagination = ({activePage, itemPerPage, totalItem}) => {
  let pages = Math.floor(totalItem / itemPerPage);
  if (totalItem % itemPerPage > 0) {
    pages ++;
  }
  let first = (activePage - 1) * itemPerPage;
  if (first < 0) {
    first = 0;
  }
  let last = first + itemPerPage;
  if (last > totalItem) {
    last = totalItem;
  }
  return {pages, first, last}
}
