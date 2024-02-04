import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import classes from "./pagination.module.css";

const range = (start, end) => {
  let length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

export const Pagination = ({
  totalItem,
  page,
  changePage,
  changePageArrow,
}) => {
  const nPage = Math.ceil(totalItem / 6);
  const paginationLength = range(1, nPage);

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalItem / 6);
    const siblingCount = 1;
    const totalPageNumbers = siblingCount + 5;

    if(totalItem === 0){
      return [page]
    }
    if (totalPageNumbers >= totalPageCount) {
      return [...Array(totalPageCount + 1).keys()].slice(1);
    }
    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(page + siblingCount, totalPageCount);

    const showleftDot = leftSiblingIndex > 1;
    const showrightDot = rightSiblingIndex < totalPageCount - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!showleftDot && showrightDot) {
      let leftItemCount = 3 * 1;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, "...", totalPageCount];
    }

    if (showleftDot && page === totalPageCount - 2) {
      let rightRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "...", ...rightRange, lastPageIndex];
    }

    if (!showrightDot && showleftDot) {
      let rightItemCount = 3 * 1;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, "...", ...rightRange];
    }

    if (showleftDot && page === 3) {
      let leftRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, ...leftRange, "...", lastPageIndex];
    }

    if (showleftDot && showrightDot) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
    }
  }, [page, totalItem]);

  return (
    <div className={classes.paginator}>
      <FontAwesomeIcon
        icon={faAngleLeft}
        style={{ color: "#8f8f8f" }}
        className={classes.icon}
        onClick={() => (page > 0 ? changePageArrow("prev") : null)}
      />
      {paginationRange.map((number, index) => {
        return (
          <span
            className={
              number !== "..."
                ? page === number
                  ? `${classes.numberPage} ${classes.active}`
                  : classes.numberPage
                : null
            }
            onClick={() => (number !== "..." ? changePage(number) : null)}
            key={index}
          >
            {number}
          </span>
        );
      })}
      <FontAwesomeIcon
        icon={faAngleRight}
        style={{ color: "#8f8f8f" }}
        className={classes.icon}
        onClick={() =>
          page < paginationLength.length ? changePageArrow("next") : null
        }
      />
    </div>
  );
};
