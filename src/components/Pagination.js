import dynamic from 'next/dynamic';
const Pagination = dynamic(() => import('antd').then(mod => mod.Pagination), { ssr: false });

export default function CustomPagination({ currentPage, total, pageSize, handlePageChange }) {
    return (
        <Pagination current={currentPage} total={total} pageSize={pageSize} onChange={handlePageChange}/>
    );
}