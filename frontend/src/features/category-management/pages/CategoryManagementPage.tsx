import { Fragment, useEffect, useState } from "react"
import { Search, ChevronDown, ChevronRight, Plus } from "lucide-react"
import type { Category, CategoryStatus } from "../types/category.types"
import useDebounce from "../../../hook/useDebounce"
import { getCategories } from "../sevices/category-management.service"
import { handleApiError } from "../../../utils/errorHandler"
import Table from "../../../components/common/table/Table"
import Pagination from "../../../components/common/pagination/Pagination"

const DEFUAL_LIMIT = 5

function CategoryManagementPage(){
    const [category, SetCategory] = useState<Category[]>([])
    const [status, setStatus] = useState<"ALL" | CategoryStatus>("ALL")
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }))
    }

    useEffect(()=> {
        let cancelled = false
        const fetchCategories = async()=> {
            setLoading(true)

            try {

                const response = await getCategories({
                    search : debouncedSearch.trim() || undefined,
                    limit : DEFUAL_LIMIT,
                    page,
                    status :status === "ALL" ? undefined : status
                })

                if(cancelled) return

                SetCategory(response.data.items)
                setTotalPages(response.data.totalPages)
                
            } catch (error) {
                if(cancelled) return

                handleApiError(error, "Unable to load categories");
                
            }finally{

                if(!cancelled){
                    setLoading(false)
                }
            }
        }
        void fetchCategories()

        return ()=> { cancelled = true}
    },[page,status, debouncedSearch])

    const handleSearchChange = (value : string) => {
        setSearch(value)
        setPage(1)
    }

    const handleStatusChange = (value: "ALL" | CategoryStatus) => {
        setStatus(value);
        setPage(1);
    }

    return (
        <div className="w-full space-y-6 pb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-[1.75rem] font-bold text-[#0F1D2F] tracking-tight leading-tight m-0">
                        Category Management
                    </h1>
                    <p className="text-slate-500 text-sm sm:text-[0.9375rem] mt-1.5 m-0">
                        Manage categories and their subcategories used for quotation requests.
                    </p>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#244673] hover:bg-[#1b3557] text-white text-sm font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
                >
                    <Plus size={16} strokeWidth={2.5} />
                    <span>Add Category</span>
                </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1 sm:flex-initial">
                    <Search size={16} className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                        type="search"
                        value={search}
                        onChange={(event) => handleSearchChange(event.target.value)}
                        placeholder="Search categories..."
                        aria-label="Search categories"
                        className="w-full sm:w-[320px] h-10 pl-10 pr-3.5 bg-white border border-slate-200/90 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#355982]/20 focus:border-[#355982] shadow-xs transition-colors [&::-webkit-search-cancel-button]:cursor-pointer"
                    />
                </div>

                <div className="relative self-start sm:self-auto">
                    <select
                        value={status}
                        onChange={(event) => handleStatusChange(event.target.value as "ALL" | CategoryStatus)}
                        aria-label="Filter by status"
                        className="h-10 pl-3.5 pr-8 bg-white border border-slate-200/90 rounded-lg text-sm text-slate-700 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#355982]/20 focus:border-[#355982] shadow-xs cursor-pointer"
                    >
                        <option value="ALL">Status: All</option>
                        <option value="ACTIVE">Status: Active</option>
                        <option value="INACTIVE">Status: Inactive</option>
                    </select>
                    <ChevronDown
                        size={15}
                        className="text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                </div>
            </div>

            <Table
                headers={[
                    "Category Name",
                    "Subcategories",
                    { label: "Status", align: "center" },
                    { label: "Actions", align: "center" },
                ]}
                loading={loading}
                loadingRows={DEFUAL_LIMIT}
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
                {category.map((item) => {
                    const isExpanded = Boolean(expandedCategories[item.id])
                    const subCount = item.subcategories?.length ?? 0

                    return (
                        <Fragment key={item.id}>
                            <tr className="hover:bg-slate-50/60 transition-colors">
                                <td className="py-4 px-6 align-middle">
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => toggleCategory(item.id)}
                                            className={`rounded-md transition-colors cursor-pointer flex items-center justify-center shrink-0 ${
                                                isExpanded
                                                    ? "w-6 h-6 border border-slate-300 bg-white text-slate-800 shadow-2xs"
                                                    : "w-6 h-6 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                                            }`}
                                            aria-label={isExpanded ? `Collapse ${item.name}` : `Expand ${item.name}`}
                                            aria-expanded={isExpanded}
                                        >
                                            {isExpanded ? (
                                                <ChevronDown size={14} className="stroke-[2.5]" />
                                            ) : (
                                                <ChevronRight size={16} className="stroke-[2.5]" />
                                            )}
                                        </button>

                                        <span className="font-bold text-[#0F1D2F] text-[14px] whitespace-nowrap">
                                            {item.name}
                                        </span>
                                    </div>
                                </td>

                                <td className="py-4 px-6 text-sm text-slate-600 font-medium whitespace-nowrap align-middle">
                                    {subCount} {subCount === 1 ? "Subcategory" : "Subcategories"}
                                </td>

                                <td className="py-4 px-6 text-center align-middle whitespace-nowrap">
                                    {item.status === "ACTIVE" ? (
                                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-md bg-[#eaf8f1] text-[#22a06b]">
                                            Active
                                        </span>
                                    ) : (
                                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-md bg-slate-100 text-slate-500">
                                            Inactive
                                        </span>
                                    )}
                                </td>

                                <td className="py-4 px-6 text-center align-middle whitespace-nowrap">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            type="button"
                                            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer min-w-[56px]"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-dashed border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors shadow-2xs cursor-pointer"
                                        >
                                            + Add Sub
                                        </button>

                                        <button
                                            type="button"
                                            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors shadow-2xs cursor-pointer min-w-[80px] ${
                                                item.status === "ACTIVE"
                                                    ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                                                    : "bg-white border-emerald-200 text-[#22a06b] hover:bg-[#eaf8f1]/50 hover:border-emerald-300"
                                            }`}
                                        >
                                            {item.status === "ACTIVE" ? "Deactivate" : "Activate"}
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            {isExpanded && (
                                <>
                                    {item.subcategories && item.subcategories.length > 0 ? (
                                        item.subcategories.map((sub) => (
                                            <tr key={sub.id} className="bg-slate-50/40 hover:bg-slate-50/80 transition-colors border-t border-slate-100">
                                                <td className="py-3.5 px-6 pl-14 sm:pl-16 align-middle">
                                                    <span className="text-sm font-medium text-slate-700">
                                                        {sub.name}
                                                    </span>
                                                </td>

                                                <td className="py-3.5 px-6 align-middle"></td>

                                                <td className="py-3.5 px-6 text-center align-middle whitespace-nowrap">
                                                    {sub.status === "ACTIVE" ? (
                                                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-md bg-[#eaf8f1] text-[#22a06b]">
                                                            Active
                                                        </span>
                                                    ) : (
                                                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-md bg-slate-100 text-slate-500">
                                                            Inactive
                                                        </span>
                                                    )}
                                                </td>

                                                <td className="py-3.5 px-6 text-center align-middle whitespace-nowrap">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            type="button"
                                                            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer min-w-[56px]"
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors shadow-2xs cursor-pointer min-w-[80px] ${
                                                                sub.status === "ACTIVE"
                                                                    ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                                                                    : "bg-white border-emerald-200 text-[#22a06b] hover:bg-[#eaf8f1]/50 hover:border-emerald-300"
                                                            }`}
                                                        >
                                                            {sub.status === "ACTIVE" ? "Deactivate" : "Activate"}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr className="bg-slate-50/30 border-t border-slate-100">
                                            <td colSpan={4} className="py-3 px-6 pl-14 sm:pl-16 text-xs italic text-slate-400">
                                                No subcategories found for this category.
                                            </td>
                                        </tr>
                                    )}
                                </>
                            )}
                        </Fragment>
                    )
                })}
            </Table>
        </div>
    )
}

export default CategoryManagementPage
