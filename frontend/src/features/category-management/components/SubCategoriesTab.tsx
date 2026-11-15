import { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import type { SubCategoryListItem, SubCategoryStatus } from "../types/sub-category";
import useDebounce from "../../../hook/useDebounce";
import { getSubCategories } from "../sevices/category-management.service";
import { handleApiError } from "../../../utils/errorHandler";
import { formatDateTime } from "../../../utils/dateFormatter";
import Table from "../../../components/common/table/Table";
import Pagination from "../../../components/common/pagination/Pagination";
import SubCategoryModal from "./SubCategoryFormModal";
import Select from "../../../components/common/select/Select";
import useCategoryStore from "../../../stores/category.store";

const DEFAULT_LIMIT = 5;

export interface SubCategoriesTabProps {
    onSubCategoryAdded?: () => void;
}

function SubCategoriesTab({onSubCategoryAdded,}: SubCategoriesTabProps) {
    const allCategories = useCategoryStore((state) => state.categories);
    const [subcategories, setSubcategories] = useState<SubCategoryListItem[]>([]);
    const [subStatus, setSubStatus] = useState<"ALL" | SubCategoryStatus>("ALL");
    const [subCategoryFilter, setSubCategoryFilter] = useState<string>("ALL");
    const [subPage, setSubPage] = useState(1);
    const [subTotalPages, setSubTotalPages] = useState(0);
    const [subLoading, setSubLoading] = useState(true);
    const [subSearch, setSubSearch] = useState("");
    const debouncedSubSearch = useDebounce(subSearch, 500);
    const [refreshCount, setRefreshCount] = useState(0);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedSubCategoryToEdit, setSelectedSubCategoryToEdit] = useState<SubCategoryListItem | null>(null);

    useEffect(() => {
        let cancelled = false;
        const fetchSubCategoriesList = async () => {
            setSubLoading(true);

            try {
                const response = await getSubCategories({
                    search: debouncedSubSearch.trim() || undefined,
                    limit: DEFAULT_LIMIT,
                    page: subPage,
                    status: subStatus === "ALL" ? undefined : subStatus,
                    categoryId: subCategoryFilter === "ALL" ? undefined : subCategoryFilter,
                });

                if (cancelled) return;

                setSubcategories(response.data.items);
                setSubTotalPages(response.data.totalPages);
            } catch (error) {
                if (cancelled) return;
                handleApiError(error, "Unable to load subcategories");
            } finally {
                if (!cancelled) {
                    setSubLoading(false);
                }
            }
        };
        void fetchSubCategoriesList();

        return () => {
            cancelled = true;
        };
    }, [subPage, subStatus, subCategoryFilter, debouncedSubSearch, refreshCount]);

    const handleSearchChange = (value: string) => {
        setSubSearch(value);
        setSubPage(1);
    };

    const handleStatusChange = (value: "ALL" | SubCategoryStatus) => {
        setSubStatus(value);
        setSubPage(1);
    };

    const handleCategoryFilterChange = (value: string) => {
        setSubCategoryFilter(value);
        setSubPage(1);
    };

    const handleCloseModal = () => {
        setIsAddModalOpen(false);
        setSelectedSubCategoryToEdit(null);
    };

    const handleModalSuccess = () => {
        handleCloseModal();
        setRefreshCount((prev) => prev + 1);
        onSubCategoryAdded?.();
    };

    const handleOpenAddModal = () => {
        setSelectedSubCategoryToEdit(null);
        setIsAddModalOpen(true);
    };

    const handleEditSubCategory = (item: SubCategoryListItem) => {
        setSelectedSubCategoryToEdit(item);
        setIsAddModalOpen(true);
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
                            value={subSearch}
                            onChange={(event) => handleSearchChange(event.target.value)}
                            placeholder="Search subcategories..."
                            aria-label="Search subcategories"
                            className="w-full sm:w-[320px] h-10 pl-10 pr-3.5 bg-white border border-slate-200/90 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#355982]/20 focus:border-[#355982] shadow-xs transition-colors [&::-webkit-search-cancel-button]:cursor-pointer"
                        />
                    </div>

                    <Select
                        value={subStatus}
                        onChange={(val) => handleStatusChange(val as "ALL" | SubCategoryStatus)}
                        aria-label="Filter subcategories by status"
                        options={[
                            { label: "Status: All", value: "ALL" },
                            { label: "Status: Active", value: "ACTIVE" },
                            { label: "Status: Inactive", value: "INACTIVE" },
                        ]}
                    />

                    <Select
                        value={subCategoryFilter}
                        onChange={handleCategoryFilterChange}
                        aria-label="Filter by parent category"
                        options={[
                            { label: "Category: All", value: "ALL" },
                            ...allCategories.map((c) => ({
                                label: c.name,
                                value: c.id,
                            })),
                        ]}
                    />
                </div>

                <button
                    type="button"
                    onClick={handleOpenAddModal}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#244673] hover:bg-[#1b3557] text-white text-sm font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
                >
                    <Plus size={16} strokeWidth={2.5} />
                    <span>Add Subcategory</span>
                </button>
            </div>

            <Table
                headers={[
                    "Subcategory Name",
                    "Category",
                    "Last Updated",
                    { label: "Status", align: "center" },
                    { label: "Actions", align: "center" },
                ]}
                loading={subLoading}
                loadingRows={DEFAULT_LIMIT}
                isEmpty={subcategories.length === 0}
                emptyTitle="No subcategories found"
                pagination={
                    subTotalPages > 0 && (
                        <Pagination
                            currentPage={subPage}
                            totalPages={subTotalPages}
                            onPageChange={setSubPage}
                        />
                    )
                }
            >
                {subcategories.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-4 px-6 align-middle font-bold text-[#0F1D2F] text-[14px] whitespace-nowrap">
                            {sub.name}
                        </td>

                        <td className="py-4 px-6 text-sm text-slate-600 font-medium whitespace-nowrap align-middle">
                            {sub.categoryName}
                        </td>

                        <td className="py-4 px-6 align-middle whitespace-nowrap">
                            <div className="text-sm font-semibold text-slate-700 leading-snug">
                                {formatDateTime(sub.updatedAt).date}
                            </div>
                            <div className="text-xs text-slate-400 font-medium leading-snug">
                                {formatDateTime(sub.updatedAt).time}
                            </div>
                        </td>

                        <td className="py-4 px-6 text-center align-middle whitespace-nowrap">
                            {sub.status === "ACTIVE" ? (
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
                                    onClick={() => handleEditSubCategory(sub)}
                                    className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer min-w-[56px]"
                                >
                                    Edit
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </Table>

            <SubCategoryModal
                isOpen={isAddModalOpen}
                categories={allCategories}
                subCategoryToEdit={selectedSubCategoryToEdit}
                onCancel={handleCloseModal}
                onSuccess={handleModalSuccess}
            />
        </>
    );
}

export default SubCategoriesTab;
