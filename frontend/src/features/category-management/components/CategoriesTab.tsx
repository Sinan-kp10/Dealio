import { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import type { Category, CategoryStatus } from "../types/category.types";
import useDebounce from "../../../hook/useDebounce";
import { getCategories } from "../sevices/category-management.service";
import { handleApiError } from "../../../utils/errorHandler";
import { formatDateTime } from "../../../utils/dateFormatter";
import Table from "../../../components/common/table/Table";
import Pagination from "../../../components/common/pagination/Pagination";
import CategoryFormModal from "./CategoryFormModal";
import Select from "../../../components/common/select/Select";
import { refreshActiveCategories } from "../../../hook/useActiveCategories";

const DEFAULT_LIMIT = 5;

export interface CategoriesTabProps {
    onCategoryChanged?: () => void;
    refreshTrigger?: number;
}

function CategoriesTab({ onCategoryChanged, refreshTrigger = 0 }: CategoriesTabProps) {
    const [category, setCategory] = useState<Category[]>([]);
    const [status, setStatus] = useState<"ALL" | CategoryStatus>("ALL");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const [selectedCategoryToEdit, setSelectedCategoryToEdit] = useState<Category | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [internalRefreshCount, setInternalRefreshCount] = useState(0);

    useEffect(() => {
        let cancelled = false;
        const fetchCategoriesList = async () => {
            setLoading(true);

            try {
                const response = await getCategories({
                    search: debouncedSearch.trim() || undefined,
                    limit: DEFAULT_LIMIT,
                    page,
                    status: status === "ALL" ? undefined : status,
                });

                if (cancelled) return;

                setCategory(response.data.items);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                if (cancelled) return;
                handleApiError(error, "Unable to load categories");
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };
        void fetchCategoriesList();

        return () => {
            cancelled = true;
        };
    }, [page, status, debouncedSearch, internalRefreshCount, refreshTrigger]);

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    const handleStatusChange = (value: "ALL" | CategoryStatus) => {
        setStatus(value);
        setPage(1);
    };

    const handleOpenAddModal = () => {
        setSelectedCategoryToEdit(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCategoryToEdit(null);
    };

    const handleModalSuccess = () => {
        handleCloseModal();
        setInternalRefreshCount((prev) => prev + 1);
        onCategoryChanged?.();
        void refreshActiveCategories();
    };

    const handleEditCategory = (item: Category) => {
        setSelectedCategoryToEdit(item);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative flex-1 sm:flex-initial">
                        <Search
                            size={16}
                            className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                        />
                        <input
                            type="search"
                            value={search}
                            onChange={(event) => handleSearchChange(event.target.value)}
                            placeholder="Search categories..."
                            aria-label="Search categories"
                            className="w-full sm:w-[320px] h-10 pl-10 pr-3.5 bg-white border border-slate-200/90 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#355982]/20 focus:border-[#355982] shadow-xs transition-colors [&::-webkit-search-cancel-button]:cursor-pointer"
                        />
                    </div>

                    <Select
                        value={status}
                        onChange={(val) => handleStatusChange(val as "ALL" | CategoryStatus)}
                        aria-label="Filter by status"
                        options={[
                            { label: "Status: All", value: "ALL" },
                            { label: "Status: Active", value: "ACTIVE" },
                            { label: "Status: Inactive", value: "INACTIVE" },
                        ]}
                    />
                </div>

                <button
                    type="button"
                    onClick={handleOpenAddModal}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#244673] hover:bg-[#1b3557] text-white text-sm font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
                >
                    <Plus size={16} strokeWidth={2.5} />
                    <span>Add Category</span>
                </button>
            </div>

            <Table
                headers={[
                    "Category Name",
                    "Subcategories",
                    "Last Updated",
                    { label: "Status", align: "center" },
                    { label: "Actions", align: "center" },
                ]}
                loading={loading}
                loadingRows={DEFAULT_LIMIT}
                isEmpty={category.length === 0}
                emptyTitle="No categories found"
                pagination={
                    totalPages > 0 && (
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />
                    )
                }
            >
                {category.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-4 px-6 align-middle font-bold text-[#0F1D2F] text-[14px] whitespace-nowrap">
                            {item.name}
                        </td>

                        <td className="py-4 px-6 text-sm text-slate-600 font-medium whitespace-nowrap align-middle">
                            {item.subcategoriesCount} {item.subcategoriesCount === 1 ? "Subcategory" : "Subcategories"}
                        </td>

                        <td className="py-4 px-6 align-middle whitespace-nowrap">
                            <div className="text-sm font-semibold text-slate-700 leading-snug">
                                {formatDateTime(item.updatedAt).date}
                            </div>
                            <div className="text-xs text-slate-400 font-medium leading-snug">
                                {formatDateTime(item.updatedAt).time}
                            </div>
                        </td>

                        <td className="py-4 px-6 text-center align-middle whitespace-nowrap">
                            {item.status === "ACTIVE" ? (
                                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-md bg-[#eaf8f1] text-[#22a06b]">
                                    Active
                                </span>
                            ) : (
                                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-md bg-[#fef1f2] text-[#e04f5f]">
                                    Inactive
                                </span>
                            )}
                        </td>

                        <td className="py-4 px-6 text-center align-middle whitespace-nowrap">
                            <div className="flex items-center justify-center">
                                <button
                                    type="button"
                                    onClick={() => handleEditCategory(item)}
                                    className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer min-w-[56px]"
                                >
                                    Edit
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </Table>

            <CategoryFormModal
                isOpen={isModalOpen}
                categoryToEdit={selectedCategoryToEdit}
                onCancel={handleCloseModal}
                onSuccess={handleModalSuccess}
            />
        </>
    );
}

export default CategoriesTab;
