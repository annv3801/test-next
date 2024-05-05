import {Pagination} from "antd/lib"

export default function CustomPagination({ currentPage, total, pageSize, handlePageChange }) {
    return (
        <Pagination current={currentPage} total={total} pageSize={pageSize} onChange={handlePageChange}/>
    );
}