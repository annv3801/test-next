import {Pagination} from "antd"

export default function CustomPagination({ currentPage, total, pageSize, handlePageChange }) {
    return (
        <Pagination current={currentPage} total={total} pageSize={pageSize} onChange={handlePageChange}/>
    );
}